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
import csc from "country-state-city";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  state: yup.object().required("State is required"),
  city: yup.object().required("City is required"),
  country: yup.object().required("Country is required"),
  postCode: yup.string().required("Post Code is required"),
});

const CheckOut = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const userState = useSelector((state) => state?.auth?.user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const countries = csc.getAllCountries();

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
      setShippingInfo(values);
    },
  });

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  useEffect(() => {}, [formik.values]);

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
                    label="country"
                    options={updatedCountries}
                    value={formik.values.country}
                    placeholder="Select Country"
                    onChange={(value) => {
                      formik.setFieldValue("country", value);
                      formik.setFieldValue("state", null);
                      formik.setFieldValue("city", null);
                    }}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
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
                    placeholder="Select State"
                    options={updatedStates(
                      formik.values.country ? formik.values.country.value : null
                    )}
                    value={formik.values.state}
                    onChange={(value) => {
                      formik.setFieldValue("state", value);
                      formik.setFieldValue("city", null);
                    }}
                  />

                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <ReactSelect
                    id="city"
                    name="city"
                    placeholder="Select City"
                    options={updatedCities(
                      formik.values.state ? formik.values.state.value : null
                    )}
                    value={formik.values.city}
                    onChange={(value) => {
                      formik.setFieldValue("city", value);
                    }}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
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
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link className="text-dark" to="/cart">
                      <IoIosArrowBack className="me-2" /> Return To Cart
                    </Link>
                    <Link className="button" to="/products">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">
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
