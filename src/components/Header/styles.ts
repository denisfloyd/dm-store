import styled from 'styled-components';
// import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerOptions = styled.div`
  display: flex;

  @media(max-width: 800px) {
    display: none;
  }
`;

// export const Cart = styled(Link)`
export const Cart = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 1.5rem;

  .cart-content {
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
  }

  .cart-icon {
    position: relative;
  }

  .cart-label {
    color: #494B62;
    font-size: 1.5rem;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }

  @media(max-width: 800px) {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const BadgeCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #F9B902;
  position: absolute;
  right: -1.5rem;
  top: -.5rem;
`;

export const LogoTitle = styled.span`
  font-family: 'Londrina Solid', cursive;
  font-size: 6rem;
  margin-left: 1rem;
  color: #FFF;

  @media(max-width: 800px) {
    font-size: 3rem;
  }
`;

export const SignIn = styled.a`
  display: block;

  &:hover {
    cursor: pointer;
  }
`;

export const DropdownSignIn = styled(SignIn)`
  display: flex;
  padding: 1rem;
  align-items: center;

  div {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #494B62;
  }

  strong {
    color: #494B62;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

export const DropdownDivider = styled.div`
  width: 90%;
  margin: auto;
  border-top: 1px solid #F9B902;
`;

export const Menu = styled.div`
  display: none;

  > div {
    z-index: 3;
    height: 0;
    overflow: hidden;
    background-color: #FFF;
    animation: slide .3s linear;
    display: none;
    position: absolute;
    right: 0;
    width: 25rem;
    border: solid 1px #F9B902;
    border-radius: .5rem;
  }

  &:hover {
    cursor: pointer;

    > div {
      display: block;
      height: 15rem;
    }
  }

  @keyframes slide {
    from {
      height: 0;
    }
    to {
      height: 15rem;
    }
  }

  @media(max-width: 800px) {
    display: block;
  }
`;
