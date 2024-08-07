import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import styled from "styled-components";

const SignUpContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SignUpButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const SignUp = () => {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await signUpWithEmail(email, password);
    if (error) {
      toast.error(error.message);
      setError(error.message);
    } else {
      toast.success("Sign-up successful! Please check your email.");
      setEmail("");
      setPassword("");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSignUp}>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <SignUpButton type='submit'>Sign Up</SignUpButton>
      </SignUpForm>
      <SignUpButton onClick={handleGoogleSignIn}>
        Sign Up with Google
      </SignUpButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SignUpContainer>
  );
};

export default SignUp;
