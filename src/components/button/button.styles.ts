import {StyleSheet} from 'react-native';
import {colors} from '~/resources/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
    width: '100%',
  },
  text: {
    color: colors.white,
  },
});

export default styles;
