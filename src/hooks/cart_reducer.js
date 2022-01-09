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
      console.log(product);
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
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cartProducts: [...state.cartProducts, newItem],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter((p) => p.id !== action.payload),
      };
    case CLEAR_CART: {
      return { ...state, cartProducts: [] };
    }
    case TOGGLE_CART_ITEM_AMOUNT:
      return {
        ...state,
        cartProducts: state.cartProducts.map((p) => {
          if (p.id === action.payload.id) {
            let tempAmount = p.amount;
            if (action.payload.value === "inc") {
              tempAmount = p.amount + 1;
            }
            if (action.payload.value === "dec") {
              tempAmount = p.amount - 1;
            }
            if (tempAmount > p.max) {
              p.amount = p.max;
            } else if (tempAmount < 1) {
              p.amount = 1;
            } else {
              p.amount = tempAmount;
            }
          }
          return p;
        }),
      };
    case COUNT_CART_TOTALS:
      const { totalPrice, totalItems } = state.cartProducts.reduce(
        (total, cardItem) => {
          const { amount, price } = cardItem;
          total.totalPrice += price * amount;
          total.totalItems += amount;
          return total;
        },
        { totalPrice: 0, totalItems: 0 }
      );
      return {
        ...state,
        totalPrice,
        totalItems,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const getLocalStorage = () => {
  const localCart = localStorage.getItem("cart");
  if (localCart) {
    return JSON.parse(localCart);
  } else {
    return [];
  }
};

const initialState = {
  totalItems: 0,
  totalPrice: 0,
  cartProducts: getLocalStorage(),
  shippingFee: 536,
};
export const useCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    cartProducts: state.cartProducts,
    shippingFee: state.shippingFee,
    addToCart: (id, product, amount, color) => {
      dispatch({
        type: ADD_TO_CART,
        payload: { id, product, amount, color },
      });
    },
    removeItem: (id) => {
      dispatch({ type: REMOVE_CART_ITEM, payload: id });
    },
    toggleAmount: (id, value) => {
      dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
    },
    clearCart: () => {
      dispatch({ type: CLEAR_CART });
    },
    countCartTotal: () => {
      dispatch({ type: COUNT_CART_TOTALS });
    },
  };
};
