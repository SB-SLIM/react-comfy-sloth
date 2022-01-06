import React, { useEffect, useContext, useReducer } from "react";
import { useFilterproducts } from "../hooks/filter_reducer";
import { useProductsContext } from "./products_context";

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const {
    filtered_products,
    loadProducts,
    gridView,
    setListview,
    setGridview,
    updateSort,
    sortValue,
    sortProducts,
  } = useFilterproducts();
  const { products } = useProductsContext();

  const sortType = {
    "price-lowest": { type: "price", sort: "asc" },
    "price-highest": { type: "price", sort: "desc" },
    "name-a": { type: "price", sort: "asc" },
    "name-z": { type: "price", sort: "desc" },
  };

  useEffect(() => {
    loadProducts(products);
  }, [products]);

  useEffect(() => {
    sortProducts();
  }, [products, sortValue]);

  return (
    <FilterContext.Provider
      value={{
        updateSort,
        setListview,
        setGridview,
        gridView,
        filtered_products,
        sortValue,
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
