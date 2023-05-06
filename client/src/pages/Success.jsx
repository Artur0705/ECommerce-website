import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createAnOrder } from "../features/user/userSlice";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartState, shippingInfo, totalAmount, cartProducts } = useSelector(
    (state) => state?.auth?.cartProducts || {}
  );

  // Function to parse query parameters
  const getQueryParams = (params) => {
    const queryString = new URLSearchParams(params);
    const sessionId = queryString.get("sessionId");
    return sessionId;
  };

  // Get sessionId from the query parameters
  const stripeSessionId = getQueryParams(location.search);

  useEffect(() => {
    if (stripeSessionId && cartProducts && shippingInfo && totalAmount) {
      console.log("Shipping Info:", shippingInfo);
      console.log("Total Price:", totalAmount);
      console.log("Total Price After Discount:", totalAmount);

      dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: cartProducts,
          paymentInfo: {
            stripeSessionId: stripeSessionId,
          },
          shippingInfo: {
            firstName: shippingInfo?.firstName || "",
            lastName: shippingInfo?.lastName || "",
            address: shippingInfo?.address || "",
            state: shippingInfo?.state || "",
            city: shippingInfo?.city || "",
            country: shippingInfo?.country || "",
            postCode: shippingInfo?.postCode || "",
            other: shippingInfo?.other || "",
          },
        })
      );
    }
  }, [
    dispatch,
    stripeSessionId,
    cartState,
    cartProducts,
    shippingInfo,
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
