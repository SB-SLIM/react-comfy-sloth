import React, { useContext, useEffect, useReducer } from "react";
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
    fetchProduct,
    isProductLoading,
    errorProduct,
    product,
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
        fetchProduct,
        isProductLoading,
        errorProduct,
        product,
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
