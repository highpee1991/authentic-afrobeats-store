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
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  font-weight: bold;
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
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>
                {formatCurrency(item.price)} x {item.quantity}
              </ItemPrice>
            </ItemDetails>
            <span>{formatCurrency(item.price * item.quantity)}</span>
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
