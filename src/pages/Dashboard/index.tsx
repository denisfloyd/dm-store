import React, { useEffect, useState } from 'react';
import { CircularProgress, Input, MenuItem } from '@material-ui/core';

import { api } from '../../api/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

import ProductCard from '../../components/ProductCard';
import {
  Container,
  SelectContainer,
  InputLabelSelect,
  Select,
  SelectMenuIcon,
  ProductList,
  LoadingContainer,
} from './styles';

import { useCart } from '../../hooks/useCart';
import ModalProductDetail from '../../components/ModalProductDetail';

interface CartItemsAmount {
  [key: number]: number;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    'electronics',
    'jewelery',
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  const { cart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<Product>({} as Product);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return { ...sumAmount, [product.id]: product.amount };
  }, {} as CartItemsAmount);

  // useEffect(() => {
  //   // async function loadCategories(): Promise<void> {
  //   //   const response = (await api('products/categories')).data as string[];

  //   //   setCategories(response);
  //   // }

  //   // loadCategories();
  //   setCategories(['electronics', 'jewelery']);
  // }, []);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const selectedCategoryFilter =
        selectedCategory !== '' ? `/category/${selectedCategory}` : '';

      const response = (await api(`products${selectedCategoryFilter}`))
        .data as Product[];

      setProducts(
        response.map(product => {
          return { ...product, priceFormatted: formatPrice(product.price) };
        }),
      );

      setIsLoadingProducts(false);
    }

    loadProducts();
  }, [selectedCategory]);

  const handleFilterCategory = (event: any): void => {
    if (event.target.value !== selectedCategory) {
      setIsLoadingProducts(true);
      setSelectedCategory(event.target.value);
    }
  };

  const toggleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  function handleSeeProductDetail(productSelected: Product): void {
    setSelectProduct(productSelected);
    setModalOpen(true);
  }

  return (
    <Container>
      <SelectContainer variant="filled">
        <InputLabelSelect id="category-select-label">
          Categoria
        </InputLabelSelect>
        <Select
          labelId="category-select-label"
          id="category-select"
          data-testid="select"
          // data-testid="select"
          value={selectedCategory}
          input={<Input />}
          onChange={handleFilterCategory}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          {categories &&
            categories.map(category => (
              <SelectMenuIcon
                data-testid={`${category}-filter`}
                key={category}
                value={category}
              >
                {category}
              </SelectMenuIcon>
            ))}
        </Select>
      </SelectContainer>

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

export default Dashboard;
