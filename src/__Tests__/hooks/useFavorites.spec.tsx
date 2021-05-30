import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { useFavorites, FavoritesProvider } from '../../hooks/useFavorites';

jest.mock('react-toastify');

const mockedToastSuccess = toast.success as jest.Mock;

const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [1, 2];

describe('useFavorites Hook', () => {
  beforeEach(() => {
    mockedSetItemLocalStorage.mockReset();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize favorites with localStorage value', () => {
    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual(
      expect.arrayContaining([...initialStoragedData]),
    );
  });

  it('should be able to add a new product to favorites', () => {
    const productId = 3;

    const { result, waitFor } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    });

    let mockedResult;
    act(() => {
      mockedResult = result.current.addProductToFavorites(productId);
    });

    expect(mockedResult).toBeTruthy();
    expect(result.current.favorites).toEqual(
      expect.arrayContaining([productId]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:favorites',
      JSON.stringify(result.current.favorites),
    );

    waitFor(() => {
      expect(mockedToastSuccess).toHaveBeenCalledWith('Produto favoritado!');
    });
  });

  it('should be able to remove a product from favorites', () => {
    const productId = 2;

    const { result, waitFor } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    });

    let mockedResult;
    act(() => {
      mockedResult = result.current.addProductToFavorites(productId);
    });

    expect(mockedResult).toBeTruthy();
    expect(result.current.favorites).toEqual(
      expect.not.arrayContaining([productId]),
    );

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@dmstore:favorites',
      JSON.stringify(result.current.favorites),
    );

    waitFor(() => {
      expect(mockedToastSuccess).toHaveBeenCalledWith('Produto desfavoritado!');
    });
  });
});
