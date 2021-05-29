import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { api } from '../../api/api';
import { useCart, CartProvider } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);

jest.mock('react-toastify');

const mockedToastError = toast.error as jest.Mock;
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
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
];

describe('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset();
    mockedSetItemLocalStorage.mockReset();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([...initialStoragedData]),
    );
  });

  it('should be able to add a new product', async () => {
    const product = {
      amount: 1,
      category: 'electronics',
      description: 'descrition test',
      id: 3,
      image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
      price: 50,
      priceFormatted: 'R$ 50,00',
      title: 'Fake Product 3',
    };

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(product);
    });

    expect(result.current.cart).toEqual(expect.arrayContaining([product]));
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should be able to increase a product amount when adding a product that already exists on cart', async () => {
    const product = {
      amount: 3,
      category: 'electronics',
      description: 'descrition test',
      id: 1,
      image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
      price: 10,
      priceFormatted: 'R$ 10,00',
      title: 'Fake Product',
    };

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(product);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
          amount: 2,
          category: 'jewelery',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should be able to remove a product', () => {
    const productId = 1;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
      ]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should not be able to remove a product that does not exist', async () => {
    const productId = 3;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData),
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to update a product amount', async () => {
    const productId = 1;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 4, productId });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
          amount: 2,
          category: 'jewelery',
          description: 'descrition test',
          id: 2,
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
          price: 60,
          priceFormatted: 'R$ 60,00',
          title: 'Fake Product 2',
        },
      ]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should not be able to update a product amount to a value smaller than 1', async () => {
    const productId = 1;

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 0, productId });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData),
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should not be able to update a product that does not exist', async () => {
    const productId = 4;

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 3, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto!',
        );
      },
      { timeout: 200 },
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData),
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to clean cart', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.clearCart();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(removeItemSpy).toHaveBeenCalledWith('@dmstore:cart');
    expect(result.current.cart.length).toBe(0);
  });
});
