import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Product } from '../../types';

import { Container, AddToCardButton, FavoriteContainer } from './styles';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  addProductToFavorites: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addProductToFavorites }) => {
  function handleProductFavorite() {
    addProductToFavorites()
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
        // onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {/* {cartItemsAmount[product.id] || 0} */}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </AddToCardButton>
    </Container>
  )
}

export default ProductCard;
