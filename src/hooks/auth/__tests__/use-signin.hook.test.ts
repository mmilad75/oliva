import * as SendbirdUiKit from '@sendbird/uikit-react-native';
import * as useUserIdHook from '../use-user-id.hook';
import {Alert} from 'react-native';
import {useSignIn} from '../use-signin.hook';
import {act, renderHook, waitFor} from '@testing-library/react-native';

describe('useSignIn Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in by nickname', async () => {
    const connectMock = jest.fn().mockResolvedValue({});
    const nickname = 'Milad';
    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByNickname(nickname);
    });

    await waitFor(() => {
      expect(connectMock).toHaveBeenCalledWith(expect.any(String), {nickname});
    });
  });

  it('should not sign in if nickname is not provided', () => {
    const connectMock = jest.fn().mockResolvedValue({});
    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByNickname('');
    });

    expect(connectMock).not.toHaveBeenCalled();
  });

  it('should sign in by user id', () => {
    const connectMock = jest.fn().mockResolvedValue({});
    const userId = 'test-user-id';
    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByUserId(userId);
    });

    expect(connectMock).toHaveBeenCalledWith(userId);
  });

  it('should setUserId on success', async () => {
    const userId = 'test-user-id';
    const setUserIdMock = jest.fn();
    const connectMock = jest.fn().mockResolvedValue({userId});

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      setUserId: setUserIdMock,
    } as any);

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() => expect(setUserIdMock).toHaveBeenCalledWith(userId));
  });

  it('should call onSuccess', async () => {
    const userId = 'test-user-id';
    const onSuccessMock = jest.fn();
    const connectMock = jest.fn().mockResolvedValue({userId});

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      setUserId: jest.fn(),
    } as any);

    const {result} = renderHook(() => useSignIn({onSuccess: onSuccessMock}));
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() => expect(onSuccessMock).toHaveBeenCalled());
  });

  it('should remove user id on failure', async () => {
    const userId = 'test-user-id';
    const removeUserIdMock = jest.fn();
    const connectMock = jest.fn().mockRejectedValue({});

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      removeUserId: removeUserIdMock,
    } as any);

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() => expect(removeUserIdMock).toHaveBeenCalled());
  });

  it('should alert user id on failure when alertOnError is enabled', async () => {
    const userId = 'test-user-id';
    const connectMock = jest.fn().mockRejectedValue({});

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      removeUserId: jest.fn(),
    } as any);
    const alertSpy = jest.spyOn(Alert, 'alert');

    const {result} = renderHook(() => useSignIn({alertOnError: true}));
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Something went wrong.',
        'We were not able to sign you in. Please try again.',
      ),
    );
  });

  it('should not alert user id on failure when alertOnError is not enabled', async () => {
    const userId = 'test-user-id';
    const connectMock = jest.fn().mockRejectedValue({});

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      removeUserId: jest.fn(),
    } as any);
    const alertSpy = jest.spyOn(Alert, 'alert');

    const {result} = renderHook(useSignIn);
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() => expect(alertSpy).not.toHaveBeenCalled());
  });

  it('should call onError', async () => {
    const userId = 'test-user-id';
    const connectMock = jest.fn().mockRejectedValue({});
    const onErrorMock = jest.fn();

    jest.spyOn(SendbirdUiKit, 'useConnection').mockReturnValue({
      connect: connectMock,
    } as any);
    jest.spyOn(useUserIdHook, 'useUserId').mockReturnValue({
      removeUserId: jest.fn(),
    } as any);

    const {result} = renderHook(() => useSignIn({onError: onErrorMock}));
    act(() => {
      result.current.signInByUserId(userId);
    });

    await waitFor(() => expect(onErrorMock).toHaveBeenCalledWith({}));
  });
});
