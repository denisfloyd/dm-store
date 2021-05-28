import React from 'react';
import Modal from '../Modal';
import { Product } from '../../types';

import {
  Container,
  Content,
  ProductOtherInfosContainer,
  CategoryTitle,
  DescriptionContainer,
} from './styles';
import ProductCard from '../ProductCard';

interface ModalProductDetailProps {
  isOpen: boolean;
  setIsOpen: () => void;
  productAmountInCart: number;
  product: Product;
}

const ModalProductDetail: React.FC<ModalProductDetailProps> = ({
  isOpen,
  setIsOpen,
  productAmountInCart,
  product,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {product && (
        <Container>
          <Content>
            <ProductCard
              key={product.id}
              product={product}
              amountInCart={productAmountInCart}
              seeProductDetail={null}
            />

            <ProductOtherInfosContainer>
              <CategoryTitle>{product.category}</CategoryTitle>

              <DescriptionContainer>
                <p>Descrição:</p>
                <strong>{product.description}</strong>
              </DescriptionContainer>
            </ProductOtherInfosContainer>
          </Content>
        </Container>
      )}
    </Modal>
  );
};

export default ModalProductDetail;
