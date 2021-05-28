import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { MdShoppingCart, MdPerson, MdMenu, MdFavorite } from 'react-icons/md';
import { GoSignOut } from "react-icons/go";

import logo from '../../assets/images/logo-dm.png';
import {
  Container,
  Cart,
  BadgeCart,
  LogoTitle,
  ContainerLogo,
  ContainerOptions,
  SignIn,
  Menu,
  DropdownSignIn,
  DropdownDivider,
  Favorites,
} from './styles';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { User, Product } from '../../types';
import { formatPrice } from '../../utils/format';

interface PrimaryMenuContentProps {
  size: number,
  user: User | null,
  items: Product[],
}

interface UserComponentProps {
  user: User | null,
  context: string,
}

interface ProductCartDropdown {
  products: Product[],
}

const ProductCartDropdown: React.FC<ProductCartDropdown> = ({ products }): JSX.Element | null => {
  if (products && products.length > 0) {
    if (products.length > 3) {
      return (
        <>
          { products.slice(0, 3).map((product: Product) => {
            return (
              <div className="product">
                <img src={product.image} alt="Produto" />
                <div>
                  <span className="product-title">{ product.title.length > 35 ? `${product.title.substring(0, 34)}...` : product.title}</span>
                  <span className="product-total">{product.amount} x <strong>{product.priceFormatted}</strong></span>
                </div>
              </div>
            );
          }) }
          <div className="see-more">
            <Link to="/cart">VER MAIS</Link>
          </div>
        </>
      );
    }

    return (
      <>
        { products.map((product: Product) => {
          return (
            <div className="product">
              <img src={product.image} alt="Produto" />
              <div>
                <span className="product-title">{ product.title.length > 35 ? `${product.title.substring(0, 34)}...` : product.title}</span>
                <span className="product-total">{product.amount} x <strong>{product.priceFormatted}</strong></span>
              </div>
            </div>
          );
        }) }
      </>
    );
  }

  return null;
}

const UserComponent: React.FC<UserComponentProps> = ({ user, context }): JSX.Element => {
  const { logout } = useAuth();

  if (context === 'mobile') {
    if (user) {
      return (
        <div className="logout" onClick={() => logout()}>
          <div>
            <GoSignOut size={34} color="#494B62" />
          </div>
          <strong>Sair</strong>
        </div>
      );
    }

    return (
      <DropdownSignIn to="/login">
        <div>
          <MdPerson size={36} color="#FFF" />
        </div>
        <strong>Fazer Login</strong>
      </DropdownSignIn>
    );
  } else {
    if (user) {
      return (
        <div className="user-logged">
          { user.username }
          <div className="logout" onClick={() => logout()}>
            <div className="logout-content">
              <div>
                <GoSignOut size={34} color="#494B62" />
              </div>
              <strong>Sair</strong>
            </div>
          </div>
        </div>
      );
     }
     return (
       <SignIn to="/login">
         <MdPerson size={36} color="#FFF" />
       </SignIn>
     );
  }
}

const PrimaryMenuContent: React.FC<PrimaryMenuContentProps> = ({ size, user, items }): JSX.Element => {
  return (
    <ContainerOptions>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
        </div>
        <div className="cart-icon">
          {
            size > 0 &&
            <BadgeCart>
              {size}
            </BadgeCart>
          }
          <MdShoppingCart size={36} color="#FFF" />
        </div>
        {
          items.length > 0 &&
          <div className="cart-dropdown">
            <ProductCartDropdown products={items} />
            <div className="cart-dropdown-total">
              <span>TOTAL :</span>
              <strong>
                {
                  formatPrice(items.reduce((sum: number, item: Product) => sum + (item.price * item.amount), 0))
                }
              </strong>
            </div>
          </div>
        }
      </Cart>
      <Favorites to="/favorites">
        <MdFavorite size={36} color="#FFF" />
      </Favorites>
      <UserComponent user={user} context="screen" />
    </ContainerOptions>
  );
};

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const { user } = useAuth();

  return (
    <Container>
      <ContainerLogo to="/">
        <img src={logo} alt="DM-Store" />
        <LogoTitle>DM-STORE</LogoTitle>
      </ContainerLogo>

      <PrimaryMenuContent size={cart.length} user={user} items={cart} />
      <Menu>
        <MdMenu size={36} color="#FFF" />
        <div>
          <UserComponent user={user} context="mobile" />
          <DropdownDivider />
          <Cart to="/cart">
            <div className="cart-content">
              <div className="cart-icon">
                {cart.length > 0 && <BadgeCart>{cart.length}</BadgeCart>}
                <MdShoppingCart size={36} color="#494B62" />
              </div>
              <div>
                <strong className="cart-label">Meu carrinho</strong>
              </div>
            </div>
          </Cart>
          <Favorites to="/favorites">
            <div>
              <MdFavorite size={36} color="#494B62" />
              <span>Favoritos</span>
            </div>
          </Favorites>
        </div>
      </Menu>
    </Container>
  );
};

export default Header;
