import React from "react";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../../utils/helpers";

const SummaryContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
`;

const ItemList = styled.div`
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.7rem;
  flex-grow: 1;
`;

const ItemName = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

const ItemPrice = styled.span`
  color: var(--color-brand-600);
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const CartSummaryImage = styled.img`
  max-width: 40px;
  max-height: 36px;
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CartSummary = () => {
  const { state } = useCart();

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <SummaryContainer>
      <SummaryTitle>Cart Summary</SummaryTitle>
      <ItemList>
        {state.items.map((item) => (
          <Item key={item.id}>
            <CartSummaryImage src={item.image} alt='cart item' />
            <ItemDetailsContainer>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>
                  {formatCurrency(item.price)} x {item.quantity}
                </ItemPrice>
              </ItemDetails>
              <div>{formatCurrency(item.price * item.quantity)}</div>
            </ItemDetailsContainer>
          </Item>
        ))}
      </ItemList>
      <TotalPrice>
        <span>Total:</span>
        <span>{formatCurrency(totalPrice)}</span>
      </TotalPrice>
    </SummaryContainer>
  );
};
export default CartSummary;
