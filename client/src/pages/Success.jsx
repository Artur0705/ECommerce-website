import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createAnOrder } from "../features/user/userSlice";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartState } = useSelector((state) => state?.auth?.cartProducts || {});

  // Function to parse query parameters
  const getQueryParams = (params) => {
    const queryString = new URLSearchParams(params);
    const sessionId = queryString.get("sessionId");
    return sessionId;
  };

  // Get sessionId from the query parameters
  const stripeSessionId = getQueryParams(location.search);
  const storedShippingInfo = localStorage.getItem("shippingInfo");
  const parsedShippingInfo = storedShippingInfo
    ? JSON.parse(storedShippingInfo)
    : null;
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const totalAmount = localStorage.getItem("totalAmount");

  useEffect(() => {
    if (stripeSessionId && cartItems && parsedShippingInfo && totalAmount) {
      dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: cartItems,
          paymentInfo: {
            stripePaymentIntentId: stripeSessionId,
          },
          shippingInfo: {
            firstName: parsedShippingInfo?.firstName || "",
            lastName: parsedShippingInfo?.lastName || "",
            address: parsedShippingInfo?.address || "",
            state: parsedShippingInfo?.state || "",
            city: parsedShippingInfo?.city || "",
            country: parsedShippingInfo?.country || "",
            postCode: parsedShippingInfo?.postCode || "",
            other: parsedShippingInfo?.other || "",
          },
        })
      );

      localStorage.removeItem("shippingInfo");
    } else {
      console.log("Not creating an order. One or more conditions are not met.");
    }
  }, [
    dispatch,
    stripeSessionId,
    cartState,
    cartItems,
    parsedShippingInfo,
    totalAmount,
  ]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card text-center">
            <div className="card-header bg-success text-white">
              <h2>Payment Successful</h2>
            </div>
            <div className="card-body my-5">
              <p>Thank you for your purchase! Your order is being processed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
