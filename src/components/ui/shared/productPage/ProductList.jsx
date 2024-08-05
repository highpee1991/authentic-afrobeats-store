import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import AddToCartButton from "../../cart/AddToCartButton";

const Card = styled.div`
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 250px;
  margin: auto;
  box-shadow: var(--shadow-md);
  padding: 2rem;

  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-900);
  margin: 0;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  span {
    font-size: 1.4rem;
    color: var(--color-grey-700);

    &.discount {
      text-decoration: line-through;
      color: red;
      margin-right: 0.5rem;
    }
  }
`;

const ButtonWrap = styled.div`
  flex-wrap: wrap;
`;

const ProductList = ({ product }) => {
  const { img1, name, price, discount_price } = product;
  return (
    <Card>
      <Link to={`/products/${product.id}`} key={product.id}>
        <ImageContainer>
          <img src={img1} alt={name} />
        </ImageContainer>
        <Title>{name}</Title>
      </Link>
      <Content>
        <Price>
          {discount_price ? (
            <>
              <span className='discount'>{formatCurrency(price)}</span>{" "}
              <span>{formatCurrency(discount_price)}</span>
            </>
          ) : (
            <span>{formatCurrency(price)}</span>
          )}
        </Price>
      </Content>
      <ButtonWrap>
        <AddToCartButton item={product} />
      </ButtonWrap>
    </Card>
  );
};

export default ProductList;
