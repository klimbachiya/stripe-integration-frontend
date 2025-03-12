import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:8080/api/payment/checkout-session?successUrl=http://localhost:3000/success&cancelUrl=http://localhost:3000/cancel", {
      method: "POST",
    });

    const sessionId = await response.text();

    const stripePromise = await loadStripe("pk_test_51Ire3ASJAJ7HyiFOxTHzpEYns6fn6XtKOQZ5Qf7P0xOmGOTQ0SjKe2B2VL9QYwPlKOPQEGWdTN5z2StnA6xV3BF300zQyEUKAO");

    const { error } = await stripePromise.redirectToCheckout({ sessionId });

    if (error) {
      console.log("Stripe Checkout Error: ", error);
    }
  };

  return (
    <div>
      <h1>Stripe Payment</h1>
      <button role="link" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Payment;