import React, { useCallback, useEffect, useState } from 'react';
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
import { useFavorites } from '../../hooks/useFavorites';
import ModalProductDetail from '../../components/ModalProductDetail';

interface CartItemsAmount {
  [key: number]: number;
}

interface DashboardProps {
  favorites?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  favorites: isFavoritePage = false,
}) => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const [categories, setCategories] = useState<string[]>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<Product>({} as Product);

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

  const filterAndFormatProductData = useCallback(
    (productsFromApi: Product[]) => {
      let productFormatted: Product[] = isFavoritePage
        ? [
            ...productsFromApi.filter(product => {
              return favorites.includes(product.id);
            }),
          ]
        : [...productsFromApi];

      productFormatted = [
        ...productFormatted.map(product => {
          return {
            ...product,
            priceFormatted: formatPrice(product.price),
          };
        }),
      ];

      setProducts(productFormatted);
    },
    [favorites, isFavoritePage],
  );

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const selectedCategoryFilter =
        selectedCategory !== '' ? `/category/${selectedCategory}` : '';

      const response = (await api(`products${selectedCategoryFilter}`))
        .data as Product[];

      filterAndFormatProductData(response);

      setIsLoadingProducts(false);
    }

    loadProducts();
  }, [isFavoritePage, selectedCategory, filterAndFormatProductData]);

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
    <>
      {!isFavoritePage && (
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
      )}

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
            products.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                amountInCart={cartItemsAmount[product.id]}
                seeProductDetail={handleSeeProductDetail}
              />
            ))}
        </ProductList>
      )}
    </>
  );
};

export default Dashboard;
