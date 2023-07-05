import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '~/app/navigators/root/root.types';
import {createGroupChannelListFragment} from '@sendbird/uikit-react-native';
import {useNavigation} from '@react-navigation/native';

const GroupChannelListFragment = createGroupChannelListFragment();

export const GroupChannelListScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
        navigation.navigate('GroupChannelCreate', {channelType});
      }}
      onPressChannel={channel => {
        navigation.navigate('GroupChannel', {channelUrl: channel.url});
      }}
    />
  );
};
