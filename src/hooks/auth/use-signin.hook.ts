import {Alert} from 'react-native';
import {User} from '@sendbird/chat';
import {useConnection} from '@sendbird/uikit-react-native';
import {useState} from 'react';
import {useUserId} from './use-user-id.hook';
import uuid from 'react-native-uuid';

interface IUseSignInOptions {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
  alertOnError?: boolean;
}

export const useSignIn = (options?: IUseSignInOptions) => {
  const {onSuccess, onError, alertOnError} = options ?? {};
  const [loading, setLoading] = useState(false);
  const {connect} = useConnection();
  const {setUserId, removeUserId} = useUserId();

  const handleSuccess = (user: User) => {
    setUserId(user.userId);
    if (onSuccess) {
      onSuccess(user);
    }
  };

  const handleError = (error: unknown) => {
    removeUserId();
    if (alertOnError) {
      Alert.alert(
        'Something went wrong.',
        'We were not able to sign you in. Please try again.',
      );
    }
    if (onError) {
      onError(error);
    }
  };

  const signInByUserId = (userId: string) => {
    connect(userId)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  const signInByNickname = (nickname: string) => {
    if (!nickname) {
      return;
    }
    setLoading(true);

    const userId = uuid.v4().toString();

    connect(userId, {nickname})
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    signInByNickname,
    signInByUserId,
  };
};
