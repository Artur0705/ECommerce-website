import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckOutWithElementsProvider = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
  );
};

export default CheckOutWithElementsProvider;
