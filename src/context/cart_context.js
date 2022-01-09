import React, { useEffect, useContext, useReducer } from "react";
import { useCart } from "../hooks/cart_reducer";

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const {
    addToCart,
    cartProducts,
    totalPrice,
    totalItems,
    clearCart,
    toggleAmount,
    removeItem,
    shippingFee,
    countCartTotal,
  } = useCart();

  useEffect(() => {
    countCartTotal();
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartProducts,
        totalPrice,
        totalItems,
        clearCart,
        toggleAmount,
        removeItem,
        shippingFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
