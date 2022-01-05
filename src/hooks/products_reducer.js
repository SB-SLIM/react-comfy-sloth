import { useReducer } from "react";
import { products_url as url } from "../utils/constants";
import { single_product_url } from "../utils/constants";

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
import { axiosApi } from "../utils/axiosAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, isProductsLoading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isProductsLoading: false,
        errorProducts: { isError: false, msg: "" },
        featuredProducts: action.payload.filter((p) => p.featured === true),
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        errorProducts: action.payload,
        isProductsLoading: false,
      };
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, isProductLoading: true };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isProductLoading: false,
        errorProduct: { isError: false, msg: "" },
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        errorProduct: action.payload,
        isProductLoading: false,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const initialState = {
  isSidebarOpen: false,
  isProductsLoading: false,
  products: [],
  errorProducts: { isError: false, msg: "" },
  featuredProducts: [],
  product: {},
  isProductLoading: false,
  errorProduct: { isError: false, msg: "" },
};

export const useProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    isSidebarOpen: state.isSidebarOpen,
    isProductsLoading: state.isProductsLoading,
    products: state.products,
    errorProducts: state.errorProducts,
    featuredProducts: state.featuredProducts,
    product: state.product,
    isProductLoading: state.isProductLoading,
    errorProduct: state.errorProduct,
    sidebarOpen: () => {
      dispatch({ type: SIDEBAR_OPEN });
    },
    sidebarClose: () => {
      dispatch({ type: SIDEBAR_CLOSE });
    },
    fetchProducts: async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      const data = await axiosApi(url);
      if (data.isError === true) {
        dispatch({ type: GET_PRODUCTS_ERROR, payload: data });
      } else {
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
      }
    },
    fetchProduct: async (id) => {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const data = await axiosApi(`${single_product_url}${id}`);
      if (data.isError === true) {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: data });
      } else {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
      }
    },
  };
};
