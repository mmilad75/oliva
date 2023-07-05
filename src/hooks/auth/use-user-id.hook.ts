import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserId = () => {
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('user_id');

    return userId;
  };

  const setUserId = async (userId: string) => {
    await AsyncStorage.setItem('user_id', userId);
  };

  const removeUserId = async () => {
    await AsyncStorage.removeItem('user_id');
  };

  return {
    getUserId,
    removeUserId,
    setUserId,
  };
};
