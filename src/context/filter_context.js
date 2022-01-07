import React, { useEffect, useContext, useReducer } from "react";
import { useFilterproducts } from "../hooks/filter_reducer";
import { useProductsContext } from "./products_context";

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const {
    filtered_products,
    all_products,
    loadProducts,
    gridView,
    setListview,
    setGridview,
    updateSort,
    sortValue,
    sortProducts,
    updateFilters,
    clearFilters,
    filterProducts,
    filters,
  } = useFilterproducts();
  const { products } = useProductsContext();

  useEffect(() => {
    loadProducts(products);
  }, [products]);

  useEffect(() => {
    filterProducts();
    sortProducts();
  }, [products, sortValue, filters]);

  return (
    <FilterContext.Provider
      value={{
        updateSort,
        setListview,
        setGridview,
        gridView,
        filtered_products,
        all_products,
        sortValue,
        updateFilters,
        clearFilters,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
