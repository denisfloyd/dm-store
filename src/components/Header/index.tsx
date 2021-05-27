import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { MdShoppingCart, MdPerson, MdMenu } from "react-icons/md";

import logo from "../../assets/images/logo-dm.png";
import { Container, Cart, BadgeCart, LogoTitle, ContainerLogo, ContainerOptions, SignIn, Menu, DropdownSignIn, DropdownDivider } from "./styles";
// import { useCart } from "../../hooks/useCart";

const PrimaryMenuContent = (props: { items: number }): JSX.Element => {
  return (
    <ContainerOptions>
      <Cart>
        {/* <Cart to="/cart"> */}
          <div>
            <strong>Meu carrinho</strong>
          </div>
          <div className="cart-icon">
            <BadgeCart>
              {props.items}
            </BadgeCart>
            <MdShoppingCart size={36} color="#FFF" />
          </div>
        </Cart>
        <SignIn>
          <MdPerson size={36} color="#FFF" />
        </SignIn>
    </ContainerOptions>
  );
}


const Header = (): JSX.Element => {
  // const { cart } = useCart();
  // const cartSize = cart.length;
  const cartSize = 0;
  const userLogged = false;

  return (
    <Container>
      {/* <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link> */}
      <ContainerLogo>
        <img src={logo} alt="DM-Store" />
        <LogoTitle>DM-STORE</LogoTitle>
      </ContainerLogo>

      <PrimaryMenuContent items={cartSize} />
      <Menu>
        <MdMenu size={36} color="#FFF"></MdMenu>
        <div>
          <DropdownSignIn>
            <div>
              <MdPerson size={36} color="#FFF" />
            </div>
            <strong>Fazer Login</strong>
          </DropdownSignIn>
          <DropdownDivider />
          <Cart>
            <div className="cart-content">
              <div className="cart-icon">
                <BadgeCart>
                  {cartSize}
                </BadgeCart>
                <MdShoppingCart size={36} color="#494B62" />
              </div>
              <div>
                <strong className="cart-label">Meu carrinho</strong>
              </div>
            </div>
          </Cart>
        </div>
      </Menu>
    </Container>
  );
};

export default Header;
