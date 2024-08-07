import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
`;

const InputField = styled.div`
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
  border-radius: var(--border-radius-md);
`;

const Error = styled.span`
  color: red;
  font-size: 0.875rem;
`;

const ShippingForm = ({ register, errors }) => {
  return (
    <FormContainer>
      <FormTitle>Shipping Information</FormTitle>

      <InputField>
        <Label htmlFor='name'>Full Name</Label>
        <Input
          type='text'
          id='name'
          {...register("name", { required: "Full name is required" })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='address'>Address</Label>
        <Input
          type='text'
          id='address'
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <Error>{errors.address.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='city'>City</Label>
        <Input
          type='text'
          id='city'
          {...register("city", { required: "City is required" })}
        />
        {errors.city && <Error>{errors.city.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='state'>State</Label>
        <Input
          type='text'
          id='state'
          {...register("state", { required: "State is required" })}
        />
        {errors.state && <Error>{errors.state.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='zip'>Zip Code</Label>
        <Input
          type='text'
          id='zip'
          {...register("zip", { required: "Zip code is required" })}
        />
        {errors.zip && <Error>{errors.zip.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='country'>Country</Label>
        <Input
          type='text'
          id='country'
          {...register("country", { required: "Country is required" })}
        />
        {errors.country && <Error>{errors.country.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </InputField>
      <InputField>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input
          type='tel'
          id='phone'
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phone && <Error>{errors.phone.message}</Error>}
      </InputField>
    </FormContainer>
  );
};

export default ShippingForm;
