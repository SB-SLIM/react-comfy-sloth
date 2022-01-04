import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../hooks/products_reducer";
import { products_url as url } from "../utils/constants";
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
import { useProducts } from "../hooks/products_reducer";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  return (
    <ProductsContext.Provider value={useProducts()}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
