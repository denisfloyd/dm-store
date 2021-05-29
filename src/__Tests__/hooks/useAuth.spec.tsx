import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/useAuth';
import { api } from '../../api/api';

const apiMock = new MockAdapter(api);

describe('useAuth hook', () => {
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

    result.current.authenticate('John Doe', '123');

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@dmstore:user',
      JSON.stringify({
        username: 'John Doe',
        token: 'token-123',
      }),
    );
    expect(result.current.user?.username).toEqual('John Doe');
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
  });
});
