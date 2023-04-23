import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      // You can now send the token to your backend for processing the payment
    }
  };

  return (
    <>
      <div className="stripe-card">
        <CardElement />
      </div>
      <button className="button" onClick={handleStripePayment}>
        Pay with Stripe
      </button>
    </>
  );
};

export default CardForm;
