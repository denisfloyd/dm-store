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
  border-radius: .7rem;
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
      transition: .3s;
      pointer-events: none;
    }
  }
`;

export const Input = styled.input`
  background-color: #FFF;
  width: 100%;
  height: 4rem;
  border-radius: .7rem;
  border: none;
  margin: 1.5rem 0;
  padding: 0 1rem;

  &:focus ~ label, &:valid ~ label {
    top: -.5rem;
    left: 0;
    color: #FFF;
  }
`;

export const User = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: #FFF;
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
  color: #FFF;
  border: 2px solid #F19536;
`;

export const SignInButtonActive = styled(SignInButton)`
  background-color: #F19536;
`;
