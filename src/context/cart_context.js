import React, { useEffect, useContext, useReducer } from "react";
import { useCart } from "../hooks/cart_reducer";

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { addToCart, cartProducts, totalPrice, totalItems } = useCart();
  return (
    <CartContext.Provider
      value={{ addToCart, cartProducts, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
