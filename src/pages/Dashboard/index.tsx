import React, { useEffect, useState } from 'react';
import { CircularProgress, MenuItem } from '@material-ui/core';

import { api } from '../../api/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import ProductCard from '../../components/ProductCard';
import {
  SelectContainer,
  InputLabelSelect,
  Select,
  SelectMenuIcon,
  ProductList,
  LoadingContainer,
} from './styles';

import { useCart } from '../../hooks/useCart';
import { FavoritesProvider } from '../../hooks/useFavorites';

interface CartItemsAmount {
  [key: number]: number;
}

const Dashboard: React.FC = () => {
  const { cart } = useCart();

  const [categories, setCategories] = useState<string[]>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return { ...sumAmount, [product.id]: product.amount };
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = (await api('products/categories')).data as string[];

      setCategories(response);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const selectedCategoryFilter =
        selectedCategory !== '' ? `/category/${selectedCategory}` : '';

      const response = (await api(`products${selectedCategoryFilter}`))
        .data as Product[];

      setProducts([
        ...response.map(product => {
          // const isFavoriteProduct = favorites.find(
          //   (favorite: number) => favorite === product.id,
          // );
          return {
            ...product,
            priceFormatted: formatPrice(product.price),
            // favorite: !!isFavoriteProduct,
          };
        }),
      ]);

      setIsLoadingProducts(false);
    }

    loadProducts();
  }, [selectedCategory]);

  // function handleProductFavorite(id: number, productIndex: number): void {
  //   const result = addProductToFavorites(id);
  //   if (result) {
  //     const updatedProducts = [...products];
  //     updatedProducts[productIndex].favorite =
  //       !updatedProducts[productIndex].favorite;
  //     setProducts(updatedProducts);
  //   }
  // }

  const handleFilterCategory = (event: any): void => {
    if (event.target.value !== selectedCategory) {
      setIsLoadingProducts(true);
      setSelectedCategory(event.target.value);
    }
  };

  return (
    <FavoritesProvider>
      <SelectContainer variant="filled">
        <InputLabelSelect id="category-select-label">
          Categoria
        </InputLabelSelect>
        <Select
          labelId="category-select"
          id="category-select"
          value={selectedCategory}
          onChange={handleFilterCategory}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          {categories &&
            categories.map(category => (
              <SelectMenuIcon key={category} value={category}>
                {category}
              </SelectMenuIcon>
            ))}
        </Select>
      </SelectContainer>

      {isLoadingProducts ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <ProductList>
          {products &&
            products.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                amountInCart={cartItemsAmount[product.id]}
              />
            ))}
        </ProductList>
      )}
    </FavoritesProvider>
  );
};

export default Dashboard;
