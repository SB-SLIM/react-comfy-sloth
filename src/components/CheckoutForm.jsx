import React, { createElement, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useUserContext } from "../context/user_context";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers.js";

export default function CheckoutForm() {
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  const { totalPrice, shippingFee, clearCart } = useCartContext();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    console.log(elements);
    const clientSecret = elements._commonOptions.clientSecret.clientSecret;
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    //  confirmParams: {
    //     return_url: "http://localhost:4242",
    //   },

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      //   setMessage("An unexpected error occured.");
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 5000);
    }

    setIsLoading(false);
  };

  return (
    <>
      <article>
        <h4>hello,{myUser && myUser.name}</h4>
        <p>your total is {formatPrice(shippingFee + totalPrice)}</p>
        <p>Test Card Number: 4242 4242 4242 4242</p>
      </article>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
