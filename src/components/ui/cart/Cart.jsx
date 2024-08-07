import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button/Button";

const CART_STORAGE_KEY = "cartItems";
const CART_TIMESTAMP_KEY = "cartTimestamp";
const CART_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

const CartContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-brand-700);
`;

const CartItemsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const CartImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

const CartDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const CartName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const CartPrice = styled.div`
  color: var(--color-brand-600);
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  color: var(--color-brand-600);

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 3rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: var(--border-radius-sm);
  margin: 0 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-brand-600);

  &:hover {
    color: #fd4444;
  }
`;

const DeliveryOptions = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const DeliveryOption = styled.label`
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const DeliveryAddressInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius-sm);
  margin-top: 0.5rem;
`;

const CalculateButton = styled.button`
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

const TotalPriceContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Cart = () => {
  const { state, dispatch } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    const currentTime = new Date().getTime();

    if (cartTimestamp && currentTime - cartTimestamp < CART_EXPIRATION_TIME) {
      const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: savedCart });
      }
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      localStorage.setItem(CART_TIMESTAMP_KEY, new Date().getTime().toString());
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_TIMESTAMP_KEY);
    }
  }, [state.items]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleDeliveryOptionChange = (e) => {
    dispatch({ type: "SET_DELIVERY_OPTION", payload: e.target.value });
  };

  const calculateDeliveryCost = async () => {
    const cost = await fetchDeliveryCost(deliveryAddress);
    setDeliveryCost(cost);
    dispatch({ type: "SET_DELIVERY_COST", payload: cost });
  };

  const fetchDeliveryCost = async (address) => {
    return new Promise((resolve) => setTimeout(() => resolve(10.0), 1000));
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  const totalPrice =
    state.items.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryCost;

  return (
    <CartContainer>
      <CartTitle>YOUR CART</CartTitle>

      <CartItemsContainer>
        {state.items.map((item) => (
          <CartItem key={item.id}>
            <CartImage
              src={item.image}
              alt={`${item.name}`}
              onClick={() => handleProductClick(item.id)}
            />
            <CartDetails>
              <CartName onClick={() => handleProductClick(item.id)}>
                {item.name}
              </CartName>
              <CartPrice>{formatCurrency(item.price)}</CartPrice>
              <QuantityControls>
                <QuantityButton
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityInput
                  type='number'
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <QuantityButton
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </QuantityButton>
              </QuantityControls>
            </CartDetails>
            <RemoveButton onClick={() => removeItem(item.id)}>
              <FaTrash />
            </RemoveButton>
          </CartItem>
        ))}
      </CartItemsContainer>
      <DeliveryOptions>
        <DeliveryOption>
          <input
            type='radio'
            value='pickup'
            checked={state.deliveryOption === "pickup"}
            onChange={handleDeliveryOptionChange}
          />
          Pickup
        </DeliveryOption>
        <DeliveryOption>
          <input
            type='radio'
            value='delivery'
            checked={state.deliveryOption === "delivery"}
            onChange={handleDeliveryOptionChange}
          />
          Delivery
        </DeliveryOption>
        {state.deliveryOption === "delivery" && (
          <div>
            <DeliveryAddressInput
              type='text'
              placeholder='Enter delivery address'
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <CalculateButton onClick={calculateDeliveryCost}>
              Calculate Delivery Cost
            </CalculateButton>
          </div>
        )}
      </DeliveryOptions>
      <TotalPriceContainer>
        <div>Total Price:</div>
        <div>{formatCurrency(totalPrice)}</div>
      </TotalPriceContainer>
      <Button style={{ marginTop: "10px" }} onClick={handleCheckoutClick}>
        Proceed to Checkout
      </Button>
    </CartContainer>
  );
};

export default Cart;
