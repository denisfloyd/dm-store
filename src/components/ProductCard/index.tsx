import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Product } from '../../types';

import { Container, AddToCardButton, FavoriteContainer } from './styles';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  addProductToFavorites: () => void;
  amountInCart: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addProductToFavorites, amountInCart }) => {
  const { addProduct: addProductToCart } = useCart();

  function handleProductFavorite() {
    addProductToFavorites()
  }

  function handleAddProduct(product: Product) {
    addProductToCart(product);
  }

  return (
    <Container>
      <img
        src={product.image}
        alt={String(product.title)}
      />
      <FavoriteContainer onClick={handleProductFavorite}>
        { product.favorite ?
          (<AiFillHeart size={24} color="#FF6666" />) :
          (<AiOutlineHeart size={24} color="#FF6666"/>)
        }
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
  )
}

export default ProductCard;
