import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import styled from "styled-components";

const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <AuthPageContainer>
      <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Go to Sign In" : "Go to Sign Up"}
      </ToggleButton>
      {isSignUp ? <SignUp /> : <SignIn />}
    </AuthPageContainer>
  );
};

export default AuthPage;
