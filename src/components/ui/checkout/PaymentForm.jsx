// src/components/ui/checkout/PaymentForm.jsx
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import supabase from "../../../api/supabase";

const PaymentContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius-sm);
`;

const Button = styled.button`
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: var(--border-radius-md);
  margin-top: 0.5rem;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const PaymentForm = () => {
  const { register, handleSubmit } = useForm();
  const { state } = useCart();

  const onSubmit = async (data) => {
    console.log(data);

    // Integrate payment processing here

    // Prepare order details
    const order = {
      items: state.items,
      deliveryOption: state.deliveryOption,
      deliveryCost: state.deliveryCost,
      totalPrice:
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + state.deliveryCost,
      shippingInfo: data,
    };

    // Save order to Supabase
    const { error } = await supabase.from("orders").insert([order]);

    if (error) {
      console.error("Error saving order to Supabase:", error);
    } else {
      console.log("Order saved to Supabase");
    }
  };

  return (
    <PaymentContainer>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor='cardNumber'>Card Number</Label>
          <Input id='cardNumber' {...register("cardNumber")} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='expiryDate'>Expiry Date</Label>
          <Input id='expiryDate' {...register("expiryDate")} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='cvc'>CVC</Label>
          <Input id='cvc' {...register("cvc")} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='phoneNumber'>Phone Number</Label>
          <Input id='phoneNumber' {...register("phoneNumber")} />
        </FormGroup>
        <Button type='submit'>Submit Payment</Button>
      </form>
    </PaymentContainer>
  );
};

export default PaymentForm;
