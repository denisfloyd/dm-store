import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormLogin = styled.form`
  width: 50rem;
  background-color: #434458;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
  padding: 4rem 0;
  position: relative;

  .input-container {
    width: 80%;
    position: relative;

    label {
      position: absolute;
      top: 2.5rem;
      left: 1rem;
      transition: 0.3s;
      pointer-events: none;
    }
  }
`;

export const Input = styled.input`
  background-color: #fff;
  width: 100%;
  height: 4rem;
  border-radius: 0.7rem;
  border: none;
  margin: 1.5rem 0;
  padding: 0 1rem;

  &:focus ~ label,
  &:valid ~ label {
    top: -0.5rem;
    left: 0;
    color: #fff;
  }
`;

export const UserIcon = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -3.5rem;
`;

export const SignInButton = styled.button`
  width: 20rem;
  height: 5rem;
  font-weight: bold;
  margin-top: 2rem;
  border-radius: 2.5rem;
  background-color: transparent;
  color: #fff;
  border: 2px solid #f19536;
`;

export const SignInButtonActive = styled(SignInButton)`
  background-color: #f19536;
`;
