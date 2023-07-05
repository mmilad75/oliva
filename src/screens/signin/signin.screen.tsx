import {View} from 'react-native';
import styles from './signin.styles';
import {useSignIn} from '~/hooks/auth/use-signin.hook';
import {Button, TextInput} from '~/components';
import React, {useState} from 'react';

export const SignInScreen: React.FC = () => {
  const [nickname, setNickName] = useState('');
  const {signInByNickname, loading} = useSignIn();

  const handleSignIn = () => {
    signInByNickname(nickname);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={handleSignIn} disabled={loading} />
      </View>
    </View>
  );
};
