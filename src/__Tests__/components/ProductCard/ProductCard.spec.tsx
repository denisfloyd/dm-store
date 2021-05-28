import React, { ImgHTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';

import ProductCard from '../../../components/ProductCard';
import { Product } from '../../../types';

jest.mock('../../../hooks/useCart', () => {
  return {
    useCart: () => ({
      addProduct: jest.fn(),
      addProductToCart: jest.fn(),
    }),
  };
});

jest.mock('../../../hooks/useFavorites', () => {
  return {
    useFavorites: () => ({
      favorites: [1, 2, 3],
      addProductToFavorites: jest.fn(),
    }),
  };
});

describe('ProductCard component', () => {
  const product: Product = {
    amount: 1,
    category: 'electronics',
    description: 'descrition test',
    id: 1,
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    price: 10,
    priceFormatted: 'R$ 10,00',
    title: 'Fake Product',
  };

  it('it should render correctly', () => {
    const { getByText, getByTestId, debug, getByAltText } = render(
      <ProductCard
        product={product}
        amountInCart={product.amount}
        seeProductDetail={null}
      />,
    );

    expect(getByText('Fake Product')).toBeInTheDocument();
    expect(getByTestId('favorite')).toBeInTheDocument();
    expect(getByText('R$ 10,00')).toBeInTheDocument();
    const cartSizeCounter = getByTestId('cart-product-quantity');
    expect(cartSizeCounter).toHaveTextContent('1');

    const image = getByAltText('Fake Product') as HTMLImageElement;
    expect(image.src).toBe(product.image);
  });
});
