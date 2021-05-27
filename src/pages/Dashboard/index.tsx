import React, { useEffect, useState } from 'react';

import { api } from '../../api/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import ProductCard from '../../components/ProductCard';
import { ProductList, LoadingContainer } from './styles';

import { CircularProgress } from '@material-ui/core';
import { useCart } from '../../hooks/useCart';

const Dashboard: React.FC = () => {
  const { favorites, addProduct: addProductToCart, addProductToFavorites } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   return { ...sumAmount, [product.id]: product.amount };
  // }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = (await api("products")).data as Product[];

      setProducts([
        ...response.map((product) => {
          const isFavoriteProduct = favorites.find(favorite => favorite === product.id);
          return {
            ...product,
            priceFormatted: formatPrice(product.price),
            favorite: !!isFavoriteProduct
          };
        }),
      ]);

      setIsLoadingProducts(false);
    }

    loadProducts();
  }, []);

  // function handleAddProduct(id: number) {
  //   addProduct(id);
  // }

  function handleProductFavorite(id: number, productIndex: number) {
    const result = addProductToFavorites(id);
    if(result) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].favorite = !updatedProducts[productIndex].favorite;
      setProducts(updatedProducts);
    }
  }


  return (
    <>
      {isLoadingProducts ?
        (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <ProductList>
            { products && products.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                addProductToFavorites={() => handleProductFavorite(product.id, index)}
              />
            ))}
          </ProductList>
        )
      }
    </>
  );
}

export default Dashboard;
