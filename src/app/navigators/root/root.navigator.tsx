import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from './root.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './root.styles';
import {useBootApp} from '~/hooks/app/use-boot-app.hook';
import {useSendbirdChat} from '@sendbird/uikit-react-native';
import {ActivityIndicator, View} from 'react-native';
import {
  GroupChannelCreateScreen,
  GroupChannelListScreen,
  GroupChannelScreen,
  SignInScreen,
} from '~/screens';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {initialized, loading} = useBootApp();
  const {currentUser} = useSendbirdChat();

  if (!initialized || loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!currentUser ? (
          <RootStack.Group>
            <RootStack.Screen name="SignIn" component={SignInScreen} />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen
              name="GroupChannelList"
              component={GroupChannelListScreen}
            />
            <RootStack.Screen
              name="GroupChannelCreate"
              component={GroupChannelCreateScreen}
            />
            <RootStack.Screen
              name="GroupChannel"
              component={GroupChannelScreen}
            />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
