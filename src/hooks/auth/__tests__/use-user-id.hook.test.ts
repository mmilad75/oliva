import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook} from '@testing-library/react-native';
import {useUserId} from '../use-user-id.hook';

describe('useUserId Hook', () => {
  it('should get user ID', () => {
    const spyGetItem = jest.spyOn(AsyncStorage, 'getItem');

    const {result} = renderHook(useUserId);
    result.current.getUserId();

    expect(spyGetItem).toHaveBeenCalledWith('user_id');
  });

  it('should set user ID', () => {
    const userID = 'test-user-id';
    const spySetItem = jest.spyOn(AsyncStorage, 'setItem');

    const {result} = renderHook(useUserId);
    result.current.setUserId(userID);

    expect(spySetItem).toHaveBeenCalledWith('user_id', userID);
  });

  it('should remove user ID', () => {
    const spyRemoveItem = jest.spyOn(AsyncStorage, 'removeItem');

    const {result} = renderHook(useUserId);
    result.current.removeUserId();

    expect(spyRemoveItem).toHaveBeenCalledWith('user_id');
  });
});
