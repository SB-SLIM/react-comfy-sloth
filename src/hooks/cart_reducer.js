import { useReducer } from "react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, product, amount, color } = action.payload;

      let tempProduct = state.cartProducts.find((i) => i.id === id + color);
      if (tempProduct) {
        const tempCart = state.cartProducts.map((i) => {
          if (i.id === tempProduct.id) {
            i = {
              ...i,
              amount: i.amount + amount > i.max ? i.max : i.amount + amount,
            };
          }
          return i;
        });
        return {
          ...state,
          cartProducts: tempCart,
        };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cartProducts: [...state.cartProducts, newItem],
        };
      }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const initialState = {
  totalItems: 0,
  totalPrice: 0,
  cartProducts: [],
};
export const useCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    cartProducts: state.cartProducts,
    addToCart: (id, product, amount, color) => {
      dispatch({
        type: ADD_TO_CART,
        payload: { id, product, amount, color },
      });
    },
  };
};
