import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import CartSummary from "./CartSummary";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderConfirmation from "./OrderConfirmation";
import submitOrder from "../../../api/apiSubmitOrder";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button/Button";
import styled from "styled-components";

// Container for checkout page
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Container for cart summary (fixed or toggleable)
const CartSummaryContainer = styled.div`
  width: 300px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  align-self: flex-start;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  @media (max-width: 768px) {
    position: static;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    transition: transform 0.3s ease;
  }
`;

// Container for forms
const FormsContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

// Toggle button
const ToggleButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: var(--color-brand-800);
    color: white;
    border: none;
    border-radius: var(--border-radius-md);
  }
`;

const CheckoutPage = () => {
  const { state } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [order, setOrder] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const orderDetails = {
      ...data,
      items: state.items,
      total: state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };
    const result = await submitOrder(orderDetails);
    setOrder(result);
  };

  return (
    <CheckoutContainer>
      <ToggleButton onClick={() => setCartOpen(!isCartOpen)}>
        {isCartOpen ? "Hide Cart Summary" : "Show Cart Summary"}
      </ToggleButton>
      <CartSummaryContainer isOpen={isCartOpen}>
        <CartSummary />
      </CartSummaryContainer>
      <FormsContainer>
        <Button size='small' onClick={() => navigate(-1)}>
          Back
        </Button>
        {!order ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ShippingForm register={register} errors={errors} />
            <PaymentForm register={register} errors={errors} />
            <Button type='submit'>Place Order</Button>
          </form>
        ) : (
          <OrderConfirmation order={order} />
        )}
      </FormsContainer>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
