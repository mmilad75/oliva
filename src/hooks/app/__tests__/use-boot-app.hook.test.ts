import * as useSignInHook from '~/hooks/auth/use-signin.hook';
import * as useUserIdHook from '~/hooks/auth/use-user-id.hook';
import {useBootApp} from '../use-boot-app.hook';
import {renderHook, waitFor} from '@testing-library/react-native';

describe('useBootApp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial data', async () => {
    const isSigningIn = false;
    jest.spyOn(useSignInHook, 'useSignIn').mockReturnValue({
      loading: isSigningIn,
    } as any);

    const {result} = renderHook(useBootApp);

    await waitFor(() => {
      expect(result.current).toEqual({
        initialized: false,
        loading: isSigningIn,
      });
    });
  });

  it('should return initialized to true if there is no userId stored', async () => {
    const isSigningIn = false;
    jest.spyOn(useSignInHook, 'useSignIn').mockReturnValue({
      loading: isSigningIn,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      getUserId: jest.fn().mockResolvedValue(undefined),
    } as any);

    const {result} = renderHook(useBootApp);

    await waitFor(() => {
      expect(result.current).toEqual({
        initialized: false,
        loading: isSigningIn,
      });
    });
  });

  it('should sign in user if there is a user id stored', async () => {
    const userId = 'test-user-id';
    const signInByUserIdMock = jest.fn();
    jest.spyOn(useSignInHook, 'useSignIn').mockReturnValue({
      loading: false,
      signInByUserId: signInByUserIdMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      getUserId: jest.fn().mockResolvedValue(userId),
    } as any);

    renderHook(useBootApp);

    await waitFor(() =>
      expect(signInByUserIdMock).toHaveBeenCalledWith(userId),
    );
  });
});
