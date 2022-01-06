import React, { useEffect, useContext, useReducer } from "react";
import useFilterproducts from "../hooks/filter_reducer";
import { useProductsContext } from "./products_context";

const FilterContext = React.createContext();


export const FilterProvider = ({ children }) => {
  const { all_products, loadProducts } = useFilterproducts();
  const { products } = useProductsContext();
  useEffect(() => {
    loadProducts(products);
  }, [products]);

  return (
    <FilterContext.Provider value="filter context">
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
