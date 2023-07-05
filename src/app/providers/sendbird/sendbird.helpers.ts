import * as CreateThumbnail from 'react-native-create-thumbnail';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImageResizer from '@bam.tech/react-native-image-resizer';
import * as Permissions from 'react-native-permissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFBMessaging from '@react-native-firebase/messaging';
import Video from 'react-native-video';
import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeMediaService,
  createNativeNotificationService,
} from '@sendbird/uikit-react-native';

const ClipboardService = createNativeClipboardService(Clipboard);
const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});
const FileService = createNativeFileService({
  documentPickerModule: DocumentPicker,
  fsModule: FileAccess,
  imagePickerModule: null,
  mediaLibraryModule: CameraRoll,
  permissionModule: Permissions,
});
const MediaService = createNativeMediaService({
  VideoComponent: Video,
  imageResizerModule: ImageResizer,
  thumbnailModule: CreateThumbnail,
});

export const permissions = {
  clipboard: ClipboardService,
  file: FileService,
  media: MediaService,
  notification: NotificationService,
};
