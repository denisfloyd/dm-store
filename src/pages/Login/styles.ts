import styled from 'styled-components';
import { darken, lighten } from 'polished';

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

  @media (max-width: 800px) {
    width: 40rem;
  }

  @media (max-width: 500px) {
    width: 29rem;
  }
`;

export const Input = styled.input`
  background-color: var(--color-white);
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
    color: var(--color-white);
  }
`;

export const UserIcon = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -3.5rem;

  @media (max-width: 800px) {
    width: 6rem;
    height: 6rem;
    top: -3rem;
  }
`;

export const SignInButton = styled.button`
  width: 20rem;
  height: 5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: var(--color-white);
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s;
  position: relative;

  .loading-container {
    position: absolute;
    right: 4rem;

    @media (max-width: 500px) {
      right: 2rem;
    }
  }

  &:hover {
    background: ${darken(0.06, '#FF9000')};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${lighten(0.15, '#FF9000')};
  }

  @media (max-width: 500px) {
    width: 15rem;
  }
`;
