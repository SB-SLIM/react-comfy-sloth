import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    featuredProducts: featured,
    isProductsLoading: isLoading,
    errorProducts: error,
  } = useProductsContext();

  if (isLoading) {
    return <Loading />;
  }

  if (error.isError) {
    return <Error />;
  }
  return (
    <Wrapper className="section">
      <div className="title">
        feautred products
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.map((product) => {
          return (
            <Product key={product.id} {...product}>
              {product.name}
            </Product>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
