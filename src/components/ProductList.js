import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
   const { filtered_products, gridView } = useFilterContext();

   if (filtered_products.lenght < 1) {
     <h5 style={{ textTransform: "none" }}>
       Sorry, no productss matched your search...
     </h5>;
   }

   if (gridView === false) {
     return <ListView products={filtered_products} />;
   }

   return <GridView products={filtered_products} />;
}

export default ProductList
