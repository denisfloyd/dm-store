import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';

import { useCart } from '../../hooks/useCart';

import { api } from '../../api/api';
import Dashboard from '../../pages/Dashboard';

const apiMock = new AxiosMock(api);

const mockedUseCart = useCart as jest.Mock;
jest.mock('../../hooks/useCart');

jest.mock('../../hooks/useFavorites', () => {
  return {
    useFavorites: () => {
      return {
        favorites: [1],
      };
    },
  };
});

describe('Dashboard component', () => {
  beforeAll(() => {
    apiMock
      .onGet('/products/categories')
      .reply(200, ['electronics', 'jewelery']);

    apiMock.onGet('products').reply(200, [
      {
        amount: 0,
        category: 'electronics',
        description: 'description test',
        id: 1,
        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
        price: 10,
        title: 'Fake Product',
      },
      {
        amount: 0,
        category: 'jewelery',
        description: 'description test',
        id: 2,
        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
        price: 60,
        title: 'Fake Product 2',
      },
    ]);

    apiMock.onGet('products/category/jewelery').reply(200, [
      {
        amount: 0,
        category: 'jewelery',
        description: 'descrition test',
        id: 2,
        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
        price: 60,
        title: 'Fake Product 2',
      },
    ]);
  });

  beforeEach(() => {
    mockedUseCart.mockReturnValue({
      cart: [
        {
          amount: 3,
          category: 'electronics',
          description: 'description test',
          id: 1,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 10,
          priceFormatted: 'R$ 10,00',
          title: 'Fake Product',
        },
        {
          amount: 2,
          category: 'jewelery',
          description: 'description test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ],
    });
  });

  it('it should render correctly', async () => {
    const { getAllByTestId } = render(<Dashboard />);

    await waitFor(() => getAllByTestId('cart-product-quantity'), {
      timeout: 200,
    });

    const [firstProductCartQuantity, secondProductCartQuantity] =
      screen.getAllByTestId('cart-product-quantity');

    expect(firstProductCartQuantity).toHaveTextContent('3');
    expect(secondProductCartQuantity).toHaveTextContent('2');
  });

  it('it should be able to filter category', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      fireEvent.mouseDown(screen.getAllByLabelText('Categoria')[0]);
      fireEvent.click(screen.getByTestId('jewelery-filter'));
    });

    const cards = screen.getAllByTestId('cart-product-quantity');

    expect(cards.length).toBe(1);
  });

  it('it should be able to open and close detail product modal', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      const [firstProductImg] = screen.getAllByRole('img');
      fireEvent.click(firstProductImg);
    });

    expect(screen.getByText('description test')).toBeInTheDocument();

    const closeModalButton = screen.getByTestId('close-modal');
    fireEvent.click(closeModalButton);

    waitFor(
      () => {
        expect(() => screen.getByText('description test')).toThrow(
          'Unable to find an element',
        );
      },
      { timeout: 200 },
    );
  });
});
