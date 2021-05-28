import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Product } from '../../types';

import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

import {
  Container,
  Content,
  AddToCardButton,
  FavoriteContainer,
} from './styles';

interface ProductCardProps {
  product: Product;
  amountInCart: number;
  seeProductDetail: ((product: Product) => void) | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  amountInCart,
  seeProductDetail,
}) => {
  const { addProduct: addProductToCart } = useCart();
  const { favorites, addProductToFavorites } = useFavorites();

  function handleProductFavorite(id: number): void {
    addProductToFavorites(id);
  }

  function handleAddProduct(productToAdd: Product): void {
    addProductToCart(productToAdd);
  }

  return (
    <Container>
      <FavoriteContainer onClick={() => handleProductFavorite(product.id)}>
        {favorites.includes(product.id) ? (
          <AiFillHeart data-testid="favorite" size={24} color="#FF6666" />
        ) : (
          <AiOutlineHeart size={24} color="#FF6666" />
        )}
      </FavoriteContainer>

      <Content
        isAbleToSeeDetail={!!seeProductDetail}
        onClick={() => {
          seeProductDetail && seeProductDetail(product);
        }}
      >
        <img src={product.image} alt={String(product.title)} />
        <div>
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
        </div>
      </Content>

      <AddToCardButton
        type="button"
        data-testid="add-product-button"
        onClick={() => handleAddProduct(product)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {amountInCart || 0}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </AddToCardButton>
    </Container>
  );
};

export default ProductCard;
