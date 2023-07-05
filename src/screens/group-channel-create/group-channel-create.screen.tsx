import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '~/app/navigators/root/root.types';
import {createGroupChannelCreateFragment} from '@sendbird/uikit-react-native';
import {useNavigation} from '@react-navigation/native';

const GroupChannelCreateFragment = createGroupChannelCreateFragment();

export const GroupChannelCreateScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async channel => {
        navigation.replace('GroupChannel', {channelUrl: channel.url});
      }}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
    />
  );
};
