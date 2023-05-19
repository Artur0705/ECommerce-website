import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactSelect from "react-select";
import axios from "axios";
import { axiosInstance, base_url } from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";
import { createAnOrder, getUserCart } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useStripe } from "@stripe/react-stripe-js";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postCode: yup.string().required("Post Code is required"),
});

const CheckOut = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const userState = useSelector((state) => state?.auth?.user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

  const [cartProductState, setCartProductState] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryIso2, setSelectedCountryIso2] = useState(null);
  const [selectedStateIso2, setSelectedStateIso2] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const [paymentGateway, setPaymentGateway] = useState("");

  const fetchCountries = async () => {
    const config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
      },
    };
    const response = await axios(config);
    return response.data;
  };

  const fetchStates = async (countryId) => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryId}/states`,
      headers: {
        "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
      },
    };
    const response = await axios(config);
    return response.data;
  };

  const fetchCities = async (countryIso2, stateIso2) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };
  useEffect(
    () => {
      dispatch(getUserCart());
    }, // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      let sum = 0;
      for (let index = 0; index < cartState?.length; index++) {
        sum =
          sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
        setTotalAmount(sum);
      }
    }, // eslint-disable-next-line
    [cartState]
  );

  const handleChange = (event) => {
    setPaymentGateway(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      postCode: "",
      other: "",
    },

    validationSchema: shippingSchema,

    onSubmit: (values) => {
      const selectedCountry = countries?.find(
        (country) => country?.id === values?.country
      );
      const selectedState = states?.find(
        (state) => state?.id === values?.state
      );

      const selectedCity = cities?.find((city) => city?.id === values?.city);

      const updatedShippingInfo = {
        ...values,
        country: selectedCountry ? selectedCountry?.name : "",
        state: selectedState ? selectedState?.name : "",
        city: selectedCity ? selectedCity?.name : "",
      };

      setShippingInfo(updatedShippingInfo);
      localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));
      checkOutHandler(updatedShippingInfo);
    },
  });

  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      if (formik.values.country) {
        const statesData = await fetchStates(formik.values.country);
        setStates(statesData);
        setSelectedStateIso2(null); // Add this line
      }
    };

    getStates();
  }, [formik.values.country]);

  useEffect(() => {
    const getCities = async () => {
      if (selectedCountryIso2 && selectedStateIso2) {
        const citiesData = await fetchCities(
          selectedCountryIso2,
          selectedStateIso2
        );
        setCities(citiesData);
      }
    };

    getCities();
  }, [selectedCountryIso2, selectedStateIso2]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState?.[index]?.productId?._id,
        quantity: cartState?.[index]?.quantity,
        color: cartState?.[index]?.color?._id,
        price: cartState?.[index]?.price,
      });
    }
    setCartProductState(items);
    // eslint-disable-next-line
  }, []);

  const handleStripePayment = async () => {
    setLoading(true);
    try {
      const cartItems = cartState?.map((item) => ({
        productTitle: item?.productId?.title,
        price: item?.productId?.price,
        productImage: item?.productId?.images[0]?.url,
        quantity: item?.quantity,
        color: item?.color,
        product: item?.productId._id,
      }));

      const response = await axiosInstance.post(
        `${base_url}user/order/create-stripe-checkout-session`,
        { cartItems, shippingInfo: shippingInfo },
        config
      );
      const sessionId = response.data.session_id;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalAmount", totalAmount);

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error:", error);
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const checkOutHandler = async (updatedShippingInfo) => {
    if (formik.isValid && paymentGateway) {
      if (paymentGateway === "razorpay") {
        try {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
          if (!res) {
            toast.error("RazorPay SDK failed to Load");
            return;
          }

          const result = await axiosInstance.post(
            `${base_url}user/order/checkout`,
            { amount: totalAmount + 15 },
            config
          );

          if (result && result.data && result.data.order) {
            const { amount, id: order_id, currency } = result.data.order;
            const options = {
              key: process.env.REACT_APP_KEY_ID,
              amount: amount,
              currency: currency,
              name: userState?.firstName + " " + userState?.lastName,
              description: "Test Transaction",
              order_id: order_id,
              handler: async function (response) {
                try {
                  const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response?.razorpay_payment_id,
                    razorpayOrderId: response?.razorpay_order_id,
                  };

                  const result = await axiosInstance.post(
                    `${base_url}user/order/paymentverification`,
                    data,
                    config
                  );

                  if (result && result?.data) {
                    dispatch(
                      createAnOrder({
                        totalPrice: totalAmount,
                        totalPriceAfterDiscount: totalAmount,
                        orderItems: cartProductState,
                        paymentInfo: {
                          razorpayPaymentId: response?.razorpay_payment_id,
                          razorpayOrderId: response?.razorpay_order_id,
                        },
                        shippingInfo: {
                          firstName: updatedShippingInfo?.firstName,
                          lastName: updatedShippingInfo?.lastName,
                          address: updatedShippingInfo?.address,
                          state: updatedShippingInfo?.state,
                          city: updatedShippingInfo?.city,
                          country: updatedShippingInfo?.country,
                          postCode: updatedShippingInfo?.postCode,
                          other: updatedShippingInfo?.other,
                        },
                      })
                    );
                  }
                } catch (error) {
                  console.error(error);
                  toast.error("An error occurred during payment verification");
                }
              },
              prefill: {
                name:
                  updatedShippingInfo?.firstName +
                  " " +
                  updatedShippingInfo?.lastName,
                email: userState?.email,
                contact: "",
              },
              notes: {
                address: updatedShippingInfo?.address,
                state: updatedShippingInfo?.state,
                city: updatedShippingInfo?.city,
                country: updatedShippingInfo?.country,
                postCode: updatedShippingInfo?.postCode,
              },
              theme: {
                color: "#61dafb",
              },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          } else {
            toast.error("Something Went Wrong");
          }
        } catch (error) {
          console.error("An error occurred during checkout: ", error);

          toast.error("An error occurred during checkout");
        }
        if (!stripe) {
          toast.error("Stripe is not properly initialized. Please try again.");
          return;
        }
      } else if (paymentGateway === "stripe") {
        try {
          await handleStripePayment();
        } catch (error) {
          console.error("Error:", error);
          toast.error("Payment failed. Please try again.");
          setLoading(false);
        }
      } else {
        toast.warn("Please select a payment gateway before placing the order");
      }
    } else {
      toast.error(
        "Please fill in all the required details and select a payment gateway before placing your order."
      );
    }
  };

  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Checkout" />

      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">iThinkTech</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark  total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Full Name: {userState?.firstName + " " + userState?.lastName}
              </p>
              <p className="user-details total">Email: {userState?.email}</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <ReactSelect
                    id="country"
                    name="country"
                    label="Country"
                    options={countries}
                    value={countries?.find(
                      (country) => country?.id === formik.values?.country
                    )}
                    onChange={(selectedCountry) => {
                      formik.setFieldValue("country", selectedCountry?.id);
                      setSelectedCountryIso2(selectedCountry?.iso2);
                    }}
                    getOptionLabel={(country) => country?.name}
                    getOptionValue={(country) => country?.id}
                    placeholder="Select a country"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div className="error ms-2 my-1">
                      {formik.errors.country}
                    </div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc."
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <ReactSelect
                    id="state"
                    name="state"
                    label="State"
                    options={states}
                    value={states?.find(
                      (state) => state?.id === formik.values.state
                    )}
                    onChange={(selectedState) => {
                      formik.setFieldValue("state", selectedState?.id);
                      setSelectedStateIso2(selectedState.iso2);
                    }}
                    getOptionLabel={(state) => state?.name}
                    getOptionValue={(state) => state?.id}
                    placeholder="Select a state"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div className="error ms-2 my-1">{formik.errors.state}</div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <ReactSelect
                    id="city"
                    name="city"
                    label="City"
                    options={cities}
                    value={cities?.find(
                      (city) => city?.id === formik.values.city
                    )}
                    onChange={(selectedCity) => {
                      formik.setFieldValue("city", selectedCity?.id);
                    }}
                    getOptionLabel={(city) => city?.name}
                    getOptionValue={(city) => city?.id}
                    placeholder="Select a city"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="error ms-2 my-1">{formik.errors.city}</div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Post Code"
                    className="form-control"
                    name="postCode"
                    value={formik.values.postCode}
                    onChange={formik.handleChange("postCode")}
                    onBlur={formik.handleBlur("postCode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.postCode && formik.errors.postCode}
                  </div>
                </div>
                <div>
                  <h2>Select Payment Gateway</h2>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="stripe"
                      name="paymentGateway"
                      value="stripe"
                      onChange={handleChange}
                    />
                    <label htmlFor="stripe">Stripe</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="razorpay"
                      name="paymentGateway"
                      value="razorpay"
                      onChange={handleChange}
                    />
                    <label htmlFor="razorpay">Razorpay</label>
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link className="text-dark" to="/cart">
                      <IoIosArrowBack className="me-2" /> Return To Cart
                    </Link>
                    <Link className="button" to="/products">
                      Continue to Shipping
                    </Link>

                    <button
                      className="button"
                      type="submit"
                      onClick={checkOutHandler}
                      disabled={!formik.isValid || !paymentGateway}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            height={100}
                            width={100}
                            src={item?.productId?.images?.[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p
                            className="colors ps-0"
                            style={{
                              backgroundColor: item?.color?.title,
                              width: 20,
                              height: 20,
                              borderRadius: 50,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total-price">
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  $ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 15</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                $ {totalAmount ? totalAmount + 15 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CheckOut;
