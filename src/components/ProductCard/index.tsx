import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Product } from '../../types';

import { Container } from './styles';

interface ProductCardProps {
  product: Product;
  addProductToCart: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addProductToCart }) => {
  return (
    <Container>
      <img
        src={product.image}
        alt={String(product.title)}
      />
      { product.favorite ?
        (<AiFillHeart size={24} color="#FF6666"/>) :
        (<AiOutlineHeart size={24} color="#FF6666"/>)
      }

      <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>
      <button
        type="button"
        data-testid="add-product-button"
        // onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {/* {cartItemsAmount[product.id] || 0} */}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </Container>
  )
}

export default ProductCard;
