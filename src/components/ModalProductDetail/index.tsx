import React from 'react';
import Modal from '../Modal';
import { Product } from '../../types';

import {
  Container,
  Content,
  ProductOtherInfosContainer,
  CategoryTitle,
  CloseIcon,
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
        <Container id="modal">
          <Content>
            <ProductCard
              key={product.id}
              product={product}
              amountInCart={productAmountInCart}
              seeProductDetail={null}
            />

            <ProductOtherInfosContainer>
              <CategoryTitle>{product.category}</CategoryTitle>

              <div>
                <p>Descrição:</p>
                <strong>{product.description}</strong>
              </div>
            </ProductOtherInfosContainer>
          </Content>

          <CloseIcon data-testid="close-modal" onClick={() => setIsOpen()}>
            X
          </CloseIcon>
        </Container>
      )}
    </Modal>
  );
};

export default ModalProductDetail;
