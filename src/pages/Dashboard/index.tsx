import React, { useEffect, useState } from 'react';

import { api } from '../../api/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import ProductCard from '../../components/ProductCard';
import { ProductList } from './styles';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   return { ...sumAmount, [product.id]: product.amount };
  // }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = (await api("products")).data as Product[];

      setProducts([
        ...response.map((product) => {
          return { ...product, priceFormatted: formatPrice(product.price), favorite: true };
        }),
      ]);
    }

    loadProducts();
  }, []);

  // function handleAddProduct(id: number) {
  //   addProduct(id);
  // }

  return (
    <ProductList>
      { products && products.map((product: Product) => (
        <ProductCard product={product} addProductToCart={() => {}}/>
      ))}
    </ProductList>
  );
}

export default Dashboard;
