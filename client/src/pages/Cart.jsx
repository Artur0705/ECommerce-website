import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart } from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(
    () => {
      dispatch(getUserCart());
    }, // eslint-disable-next-line
    []
  );
  const [subtotal, setSubtotal] = useState(0); // State to hold the subtotal
  const [quantities, setQuantities] = useState(
    userCartState &&
      userCartState?.reduce((acc, item) => {
        acc[item?.productId?._id] = item?.quantity;
        return acc;
      }, {})
  );

  useEffect(() => {
    dispatch(getUserCart());
    // eslint-disable-next-line
  }, []);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 300);
  };
  useEffect(() => {
    // Calculate subtotal when quantities or userCartState changes
    if (userCartState && userCartState?.length > 0) {
      const calculatedSubtotal = userCartState?.reduce(
        (total, item) =>
          total + item?.price * quantities?.[item?.productId?._id],
        0
      );
      setSubtotal(calculatedSubtotal);
    } else {
      setSubtotal(0);
    }
  }, [userCartState, quantities]);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="productImage"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>

                        <div className="d-flex gap-3">
                          Color:
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          value={quantities?.[item?.productId?._id]}
                        />
                      </div>
                      <div>
                        <AiOutlineDelete
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger fs-3"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/products" className="button">
                Continue to Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Subtotal: ${subtotal}</h4>
                {/* Display the subtotal dynamically */}
                <p>Taxes and Shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
