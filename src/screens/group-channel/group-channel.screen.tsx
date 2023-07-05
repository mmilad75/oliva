import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '~/app/navigators/root/root.types';
import {useGroupChannel} from '@sendbird/uikit-chat-hooks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  createGroupChannelFragment,
  useSendbirdChat,
} from '@sendbird/uikit-react-native';

const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'GroupChannel'>>();

  const {sdk} = useSendbirdChat();
  const {channel} = useGroupChannel(sdk, params.channelUrl);
  if (!channel) {
    return null;
  }

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        navigation.navigate('GroupChannelList');
      }}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
      onPressHeaderRight={() => {
        navigation.navigate('GroupChannelSettings', {
          channelUrl: params.channelUrl,
        });
      }}
    />
  );
};
