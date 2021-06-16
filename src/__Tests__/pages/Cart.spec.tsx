import React, { ReactNode } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';
import { api } from '../../api/api';
import { useAuth } from '../../hooks/useAuth';

const mockedRemoveProduct = jest.fn();
const mockedUpdateProductAmount = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

const apiMock = new AxiosMock(api);

const mocketUseAuth = useAuth as jest.Mock;
jest.mock('../../hooks/useAuth');

const mockedRouterLink = jest.fn();
jest.mock('react-router', () => {
  return {
    useHistory: () => ({
      push: mockedRouterLink,
    }),
  };
});

jest.mock('react-toastify');
const mockedToastWarning = toast.warning as jest.Mock;

describe('Cart Page', () => {
  beforeAll(() => {
    apiMock.onPost('/carts').reply(200, 'ok');
  });

  beforeEach(() => {
    mocketUseAuth.mockReturnValue({
      user: {
        username: 'John Doe',
        token: 'fake-token',
      },
    });

    mockedUseCartHook.mockReturnValue({
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
          category: 'jewelery',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ],
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount,
      clearCart: jest.fn(),
    });
  });

  it('should be able to render cart', () => {
    const { getAllByTestId, getByTestId } = render(<Cart />);

    const [firstProductAmount, secondProductAmount] =
      getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('3');
    expect(secondProductAmount).toHaveDisplayValue('2');

    expect(getByTestId('total-cart')).toHaveTextContent('150');
  });

  it('should br able to show a disclaimer when cart does not have producs', () => {
    mockedUseCartHook.mockReturnValueOnce({
      cart: [],
    });

    const { getByText, getByTestId } = render(<Cart />);

    expect(getByText('Não há produtos no carrinho!')).toBeInTheDocument();
    expect(getByTestId('checkout-button')).toHaveProperty('disabled');
  });

  it('should be able to increase/decrease a product amount', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [incrementFirstProduct] = getAllByTestId('increment-product');
    const [, decrementSecondProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount, secondProductAmount] =
      getAllByTestId('product-amount');

    fireEvent.click(incrementFirstProduct);
    fireEvent.click(decrementSecondProduct);

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 4,
      productId: 1,
    });
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 1,
      productId: 2,
    });

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 4,
          category: 'electronics',
          description: 'descrition test',
          id: 1,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 10,
          priceFormatted: 'R$ 10,00',
          title: 'Fake Product',
        },
        {
          amount: 1,
          category: 'jewelery',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProductAmount).toHaveDisplayValue('4');
    expect(secondProductAmount).toHaveDisplayValue('1');
  });

  it('should not be able to decrease a product amount when value is 1', () => {
    mockedUpdateProductAmount.mockReset();

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          category: 'electronics',
          description: 'descrition test',
          id: 1,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 10,
          priceFormatted: 'R$ 10,00',
          title: 'Fake Product',
        },
      ],
    });

    const { getAllByTestId } = render(<Cart />);

    const [decrementFirstProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty('disabled');
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled();
  });

  it('should be able to remove a product', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [removeFirstProduct] = getAllByTestId('remove-product');
    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          category: 'jewelery',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });

  it('should be able to checkout cart', async () => {
    const { getByTestId, queryAllByTestId, rerender } = render(<Cart />);

    const checkoutButton = getByTestId('checkout-button');

    act(() => {
      fireEvent.click(checkoutButton);
    });

    await waitFor(() => {
      expect(mockedRouterLink).toHaveBeenCalledWith('');
    });

    mockedUseCartHook.mockReturnValueOnce({
      cart: [],
    });

    rerender(<Cart />);
    const allProductAmounInCart = queryAllByTestId('all-product-amount');
    expect(allProductAmounInCart).toEqual([]);
  });

  it('should not be able to checkout cart with no authenticated user', async () => {
    mocketUseAuth.mockReturnValue({
      user: null,
    });

    const { getByTestId } = render(<Cart />);

    const checkoutButton = getByTestId('checkout-button');

    act(() => {
      fireEvent.click(checkoutButton);
    });

    await waitFor(() => {
      expect(mockedToastWarning).toHaveBeenCalledWith(
        'Para finalizar a compra é necessário realizar o Login!',
      );
    });
  });
});
