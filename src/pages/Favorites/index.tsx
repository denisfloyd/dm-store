import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { api } from '../../api/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import ProductCard from '../../components/ProductCard';
import { Container, ProductList, LoadingContainer } from './styles';

import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import ModalProductDetail from '../../components/ModalProductDetail';

interface CartItemsAmount {
  [key: number]: number;
}

const Favorites: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  const { cart } = useCart();
  const { favorites } = useFavorites();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<Product>({} as Product);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return { ...sumAmount, [product.id]: product.amount };
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = (await api(`products`)).data as Product[];

      setProducts(
        response
          .filter(product => {
            return favorites.includes(product.id);
          })
          .map(product => {
            return { ...product, priceFormatted: formatPrice(product.price) };
          }),
      );

      setIsLoadingProducts(false);
    }

    loadProducts();
  }, [favorites]);

  const toggleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  function handleSeeProductDetail(productSelected: Product): void {
    setSelectProduct(productSelected);
    setModalOpen(true);
  }

  return (
    <Container>
      <ModalProductDetail
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        product={selectProduct}
        productAmountInCart={cartItemsAmount[selectProduct.id]}
      />

      {isLoadingProducts ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <ProductList>
          {products &&
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                amountInCart={cartItemsAmount[product.id]}
                seeProductDetail={handleSeeProductDetail}
              />
            ))}
        </ProductList>
      )}
    </Container>
  );
};

export default Favorites;
