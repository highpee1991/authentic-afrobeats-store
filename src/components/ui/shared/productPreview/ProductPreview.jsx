import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../button/Button";
import { formatCurrency } from "../../../../utils/helpers";

const CategoryPreviewWrapper = styled.div`
  margin: 2rem;
`;

const ProductList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const ProductCard = styled.div`
  flex: 0 0 200px;
  cursor: pointer;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 2px;
  img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-md);
  }
  &:hover {
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-brand-600);
  }
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

const Title = styled.h2`
  /* text-transform: uppercase; */
  margin-bottom: 2rem;
  color: var(--color-brand-900);
  /* font-size: 2rem; */
  /* text-transform: uppercase; */
  /* font-weight: bold; */

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProductName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-900);
`;

const ProductPreview = ({ title, products, categoryPath, limit = 4 }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleSeeAllClick = () => {
    navigate(categoryPath);
  };

  return (
    <CategoryPreviewWrapper>
      <Title>{title}</Title>
      <ProductList>
        {products.slice(0, limit).map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.img1} alt='product.name' />
            <ProductName>{product.name}</ProductName>
            <Price>
              {product.discount_price ? (
                <>
                  <span className='discount'>
                    {formatCurrency(product.price)}
                  </span>{" "}
                  <span>{formatCurrency(product.discount_price)}</span>
                </>
              ) : (
                <span>{formatCurrency(product.price)}</span>
              )}
            </Price>
          </ProductCard>
        ))}
      </ProductList>
      <Button size='medium' onClick={handleSeeAllClick}>
        See All {title}
      </Button>
    </CategoryPreviewWrapper>
  );
};

export default ProductPreview;
