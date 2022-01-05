import React, { useContext, useEffect, useReducer } from "react";

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
  const {
    isSidebarOpen,
    isProductsLoading,
    products,
    errorProducts,
    featuredProducts,
    sidebarOpen,
    sidebarClose,
    fetchProducts,
  } = useProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        isSidebarOpen,
        isProductsLoading,
        products,
        errorProducts,
        featuredProducts,
        sidebarOpen,
        sidebarClose,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
