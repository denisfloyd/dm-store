import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';

const mockedRemoveProduct = jest.fn();
const mockedUpdateProductAmount = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

describe('Cart Page', () => {
  beforeEach(() => {
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
    });
  });

  it('should br able to render cart', () => {
    const { getAllByTestId, getByTestId } = render(<Cart />);

    const [firstProductAmount, secondProductAmount] =
      getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('3');
    expect(secondProductAmount).toHaveDisplayValue('2');

    expect(getByTestId('total-cart')).toHaveTextContent('150.00');
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
});
