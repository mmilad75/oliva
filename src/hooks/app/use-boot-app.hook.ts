import {useSignIn} from '../auth/use-signin.hook';
import {useUserId} from '../auth/use-user-id.hook';
import {useEffect, useState} from 'react';

export const useBootApp = () => {
  const [initialized, setInitialized] = useState(false);
  const {getUserId} = useUserId();
  const {signInByUserId, loading: isSigningIn} = useSignIn({
    onSuccess: () => setInitialized(true),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserId();

      if (!userId) {
        setInitialized(true);

        return;
      }
      signInByUserId(userId);
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    initialized,
    loading: isSigningIn,
  };
};
