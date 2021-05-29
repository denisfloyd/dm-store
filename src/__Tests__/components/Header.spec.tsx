import React, { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import { useCart } from '../../hooks/useCart';

const mockedRouterLink = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
    useHistory: () => ({
      push: mockedRouterLink,
    }),
  };
});

const mockedUseCart = useCart as jest.Mock;
jest.mock('../../hooks/useCart');

const mocketLogoutUser = jest.fn();
const mocketUseAuth = useAuth as jest.Mock;
jest.mock('../../hooks/useAuth');

describe('Header component', () => {
  beforeEach(() => {
    mocketUseAuth.mockReturnValue({
      user: {
        username: 'John Doe',
        token: 'fake-token',
      },
      logout: mocketLogoutUser,
    });

    mockedUseCart.mockReturnValue({
      cart: [],
    });
  });

  it('it should render correctly', async () => {
    render(<Header />);

    expect(screen.getByAltText('DM-Store')).toBeInTheDocument();
    expect(screen.getByText('DM-STORE')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(() => screen.getByTestId('fcart-size')).toThrow(
          'Unable to find an element',
        );
      },
      { timeout: 200 },
    );
  });

  it('should be able to render the amount of products added to cart', () => {
    mockedUseCart.mockReturnValueOnce({
      cart: [
        {
          amount: 3,
          category: 'electronics',
          description: 'descrition test',
          id: 1,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 10,
          priceFormatted: 'R$ 10,00',
          title: 'Fake Product',
        },
        {
          amount: 2,
          category: 'electronics',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 20,
          priceFormatted: 'R$ 20,00',
          title: 'Fake Product 2',
        },
      ],
    });

    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter).toHaveTextContent('2');
  });

  it('should be able to go to cart page', () => {
    render(<Header />);

    waitFor(
      () => {
        fireEvent.click(screen.getByTestId('cart-icon'));
        expect(mockedRouterLink).toHaveBeenCalledWith('/cart');
      },
      { timeout: 500 },
    );
  });
});
