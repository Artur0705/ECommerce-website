import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getOrderedProducts?.orders
  );

  useEffect(
    () => {
      dispatch(getOrders());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div
                    style={{ backgroundColor: "#febd69" }}
                    key={index}
                    className="row my-3 pt-3"
                  >
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div
                        style={{ backgroundColor: "#232f3e" }}
                        className="row p-3"
                      >
                        <div className="col-3">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Color</h6>
                        </div>
                        {item?.orderItems?.map((item, index) => {
                          return (
                            <div key={index} className="col-12">
                              <div className="row bg-secondary p-3">
                                <div className="col-3">
                                  <p className="text-white">
                                    {item?.product?.title}
                                  </p>
                                </div>
                                <div className="col-3">
                                  <p className="text-white">{item?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <p className="text-white">{item?.price}</p>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li
                                      style={{
                                        backgroundColor: item?.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
