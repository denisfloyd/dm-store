import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;

export const ContainerLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const ContainerOptions = styled.div`
  display: flex;

  .user-logged {
    display: flex;
    color: #FFF;
    font-weight: bold;
    align-items: center;
    font-size: 1.5rem;
    position: relative;

    .logout {
      z-index: 3;
      height: 0;
      overflow: hidden;
      background-color: #FFF;
      animation: slide-logout .3s linear;
      display: none;
      position: absolute;
      right: 0;
      top: 4rem;
      width: 25rem;
      border: solid 1px #F9B902;
      border-radius: .5rem;

      &-content {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 1.5rem 1rem 1rem 1rem;

        strong {
          color: #494B62;
          font-size: 1.5rem;
        }
      }
    }

    &:hover {
      cursor: pointer;

      .logout {
        display: block;
        height: 6rem;

        &-content {
          strong {
            margin-left: 1rem;
            margin-bottom: 1rem;
          }
        }
      }
    }

    @keyframes slide-logout {
      from {
        height: 0;
      }
      to {
        height: 6rem;
      }
    }

  }

  @media(max-width: 800px) {
    display: none;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 1.5rem;
  position: relative;

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

  .cart-dropdown {
    z-index: 3;
    height: 0;
    overflow: hidden;
    background-color: #FFF;
    animation: slide-cart .3s linear;
    display: none;
    position: absolute;
    right: 0;
    top: 4rem;
    width: 30rem;
    border: solid 1px #F9B902;
    border-radius: .5rem;

    &-total {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      padding: 1rem;

      span {
        font-size: 1.5rem;
      }

      strong {
        font-size: 2rem;
      }

      span, strong {
        font-weight: bold;
        color: #494B62;
      }
    }

    .see-more {
      width: 100%;
      display: flex;
      justify-content: center;

      a {
        text-decoration: none;
        color: #F9B902;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }

    .product {
      display: flex;
      width: 90%;
      margin: 2rem auto;
      padding-bottom: .5rem;
      border-bottom: 1px solid #F9B902;

      img {
        width: 6rem;
        height: 6rem;
        object-fit: contain;
      }

      div {
        display: flex;
        flex-direction: column;
        margin: 0 2rem;
        text-wrap: break-word;
        text-align: left;
      }

      &-title {
        font-weight: bold;
        font-size: 1.5rem;
        color: #494B62;
      }

      &-total {
        display: flex;
        align-items: flex-end;
        font-size: 1.5rem;
        color: #494B62;

        strong {
          color: #494B62;
          margin-left: .5rem;
          font-size: 1.7rem;
        }
      }
    }
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

  @keyframes slide-cart {
    from {
      height: 0;
    }
    to {
      height: 40rem;
    }
  }

  @media(max-width: 800px) {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;

    .cart-dropdown {
      display: block;
      height: 40rem;
    }
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
  font-family: 'Montserrat', sans-serif;
  font-size: 5rem;
  margin-left: 1rem;
  color: #FFF;

  @media(max-width: 800px) {
    font-size: 3rem;
  }
`;

export const SignIn = styled(Link)`
  display: block;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

export const Favorites = styled(Link)`
  display: block;
  text-decoration: none;
  margin-right: 2rem;

  div {
    display: flex;
    align-items: center;
    color: #494B62;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 1rem;

    span {
      margin-left: 1rem;
    }
  }

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

    a, div {
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 2rem 0 0 1.5rem;
    color: #494B62;


    strong {
      margin-left: 1rem;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  }

  &:hover {
    cursor: pointer;

    > div {
      display: block;
      height: 20rem;
    }
  }

  @keyframes slide {
    from {
      height: 0;
    }
    to {
      height: 20rem;
    }
  }

  @media(max-width: 800px) {
    display: block;
  }
`;
