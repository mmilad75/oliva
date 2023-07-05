import AsyncStorage from '@react-native-async-storage/async-storage';
import {SENDBIRD_APP_ID} from '~/config/app';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import {permissions} from './sendbird.helpers';
import React, {PropsWithChildren} from 'react';

export const SendbirdProvider = ({children}: PropsWithChildren) => {
  return (
    <SendbirdUIKitContainer
      appId={SENDBIRD_APP_ID}
      chatOptions={{localCacheStorage: AsyncStorage}}
      userProfile={{
        onCreateChannel() {
          // Sendbird doesn't allow to create ui kit container without this function
        },
      }}
      platformServices={permissions}>
      {children}
    </SendbirdUIKitContainer>
  );
};
