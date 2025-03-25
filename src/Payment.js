import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const handleCheckout = async () => {
    const response = await fetch("https://stripe-integration-backend.onrender.com/api/payment/checkout-session?successUrl=https://klimbachiya.github.io/stripe-integration-frontend&cancelUrl=https://klimbachiya.github.io/stripe-integration-frontend", {
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