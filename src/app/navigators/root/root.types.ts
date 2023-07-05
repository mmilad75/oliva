import {GroupChannelType} from '@sendbird/uikit-react-native';

export type RootStackParamList = {
  SignIn: undefined;
  GroupChannelList: undefined;
  GroupChannelCreate: {channelType: GroupChannelType};
  GroupChannel: {channelUrl: string};
  GroupChannelSettings: {channelUrl: string};
};
