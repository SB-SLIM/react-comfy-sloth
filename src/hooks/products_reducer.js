import { useReducer } from "react";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return "GET_PRODUCTS_BEGIN";
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const initialState = { isSidebarOpen: false };

export const useProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    isSidebarOpen: state.isSidebarOpen,
    sidebarOpen: () => {
      dispatch({ type: SIDEBAR_OPEN });
    },
    sidebarClose: () => {
      dispatch({ type: SIDEBAR_CLOSE });
    },
  };
};
