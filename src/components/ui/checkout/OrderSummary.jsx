import React from "react";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../../utils/helpers";

const SummaryContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
`;

const OrderSummary = () => {
  const { state } = useCart();

  const totalPrice =
    state.items.reduce((total, item) => total + item.price * item.quantity, 0) +
    state.deliveryCost;

  return (
    <SummaryContainer>
      <h2>Order Summary</h2>
      {state.items.map((item) => (
        <SummaryItem key={item.id}>
          <span>
            {item.name} x {item.quantity}
          </span>
          <span>{formatCurrency(item.price * item.quantity)}</span>
        </SummaryItem>
      ))}
      {state.deliveryOption === "delivery" && (
        <SummaryItem>
          <span>Delivery Cost</span>
          <span>{formatCurrency(state.deliveryCost)}</span>
        </SummaryItem>
      )}
      <Total>
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </Total>
    </SummaryContainer>
  );
};

export default OrderSummary;
