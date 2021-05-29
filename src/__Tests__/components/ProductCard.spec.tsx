import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useCart', () => {
  return {
    useCart: () => {
      return {
        cart: [],
        addProduct: jest.fn(),
      };
    },
  };
});

jest.mock('../../hooks/useFavorites', () => {
  return {
    useFavorites: () => {
      return {
        favorites: [1, 2, 5],
        addProductToFavorites: jest.fn(),
      };
    },
  };
});

const mockedUseAuth = useAuth as jest.Mock;
jest.mock('../../hooks/useAuth');

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

describe('ProductCard component', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      user: {
        username: 'John Doe',
        token: 'fake-token',
      },
    });
  });

  it('it should render correctly', () => {
    const { getByText, getByTestId, getByAltText } = render(
      <ProductCard
        product={product}
        amountInCart={product.amount}
        seeProductDetail={null}
        addProductToCart={() => {
          return true;
        }}
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

  it('should hide favorite icon when user is not authenticated', async () => {
    mockedUseAuth.mockReturnValueOnce({
      user: null,
    });

    render(
      <ProductCard
        product={product}
        amountInCart={product.amount}
        seeProductDetail={null}
        addProductToCart={() => {
          return true;
        }}
      />,
    );

    await waitFor(
      () => {
        expect(() => screen.getByTestId('favotite-container')).toThrow(
          'Unable to find an element',
        );
      },
      { timeout: 200 },
    );
  });
});
