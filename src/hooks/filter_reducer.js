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
      let maxPrice = Math.max(...action.payload.map((p) => p.price));

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };

    case SET_LISTVIEW:
      return { ...state, gridView: false };

    case SET_GRIDVIEW:
      return { ...state, gridView: true };

    case UPDATE_SORT:
      return { ...state, sortValue: action.payload };

    case SORT_PRODUCTS:
      let tempList = [...state.filtered_products];
      if (state.sortValue === "price-lowest") {
        tempList = tempList.sort((a, b) => a.price - b.price);
      }
      if (state.sortValue === "price-highest") {
        tempList = tempList.sort((a, b) => b.price - a.price);
      }
      if (state.sortValue === "name-a") {
        tempList = tempList.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (state.sortValue === "name-z") {
        tempList = tempList.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempList };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.includes(color);
        });
      }
      if (price !== state.filters.max_price) {
        tempProducts = tempProducts.filter((product) => {
          return product.price <= price;
        });
      }
      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true;
        });
      }

      return { ...state, filtered_products: tempProducts };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

const initialState = {
  all_products: [],
  filtered_products: [],
  gridView: true,
  sortValue: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

export const useFilterproducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    all_products: state.all_products,
    filtered_products: state.filtered_products,
    gridView: state.gridView,
    sortValue: state.sortValue,
    filters: state.filters,
    loadProducts: (products) => {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    },
    setListview: () => {
      dispatch({ type: SET_LISTVIEW });
    },
    setGridview: () => {
      dispatch({ type: SET_GRIDVIEW });
    },
    updateSort: (eventValue) => {
      dispatch({ type: UPDATE_SORT, payload: eventValue });
    },
    sortProducts: () => {
      dispatch({ type: SORT_PRODUCTS });
    },
    updateFilters: (e) => {
      const name = e.target.name;
      let value = e.target.value;
      if (name === "price") {
        value = Number(value);
      }
      if (name === "shipping") {
        value = e.target.checked;
      }
      dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    },
    clearFilters: () => {
      dispatch({ type: CLEAR_FILTERS });
    },
    filterProducts: () => {
      dispatch({ type: FILTER_PRODUCTS });
    },
  };
};
