import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const initialState = {
  all_products: [],
  filtered_products: [],
};

export const useFilterproducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    all_products: state.all_products,
    filtered_products: state.filtered_products,
    loadProducts: (products) => {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    },
  };
}