import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Product } from '../../types';

import { Container, AddToCardButton, FavoriteContainer } from './styles';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

interface ProductCardProps {
  product: Product;
  amountInCart: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, amountInCart }) => {
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
      <img src={product.image} alt={String(product.title)} />
      <FavoriteContainer onClick={() => handleProductFavorite(product.id)}>
        {favorites.includes(product.id) ? (
          <AiFillHeart size={24} color="#FF6666" />
        ) : (
          <AiOutlineHeart size={24} color="#FF6666" />
        )}
      </FavoriteContainer>

      <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>
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
