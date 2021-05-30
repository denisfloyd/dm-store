import { ReactNode } from 'react';

import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';
import { toast } from 'react-toastify';

import { useAuth, AuthProvider } from '../../hooks/useAuth';
import { api } from '../../api/api';

const apiMock = new AxiosMock(api);

jest.mock('react-toastify');
const mockedToastError = toast.error as jest.Mock;

const mockedRouterLink = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
    useHistory: () => ({
      push: mockedRouterLink,
    }),
  };
});

describe('useAuth hook', () => {
  beforeEach(() => {
    apiMock.reset();
  });

  it('should be able to signin', async () => {
    const apiResponse = {
      username: 'John Doe',
      token: 'token-123',
    };

    apiMock.onPost('/auth/login').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.authenticate('John Doe', '123');
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@dmstore:user',
      JSON.stringify({
        username: 'John Doe',
        token: 'token-123',
      }),
    );
    expect(result.current.user?.username).toEqual('John Doe');
    expect(mockedRouterLink).toHaveBeenCalledTimes(1);
  });

  it('should not be able to signin with wrong user or password', async () => {
    const apiResponse = {
      status: 'Error',
      msg: 'wrong username',
    };

    apiMock.onPost('/auth/login').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockReset();

    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.authenticate('John Doe', '123');
    });

    waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith(
        'Erro ao autenticar usuário',
      );
      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      return JSON.stringify({
        username: 'John Doe',
        token: 'token-123',
      });
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user?.username).toEqual('John Doe');
    expect(result.current.user?.token).toEqual('token-123');
  });

  it('should be able to sign out', async () => {
    mockedRouterLink.mockReset();
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      return JSON.stringify({
        username: 'John Doe',
        token: 'token-123',
      });
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(result.current.user?.username).toBeUndefined();
    expect(result.current.user?.token).toBeUndefined();
    expect(mockedRouterLink).toHaveBeenCalledTimes(1);
  });
});
