import {IButtonProps} from './button.types';
import {colors} from '~/resources/theme';
import styles from './button.styles';
import {Pressable, Text} from 'react-native';
import React, {useMemo} from 'react';

export const Button: React.FC<IButtonProps> = ({title, disabled, ...props}) => {
  const backgroundColor = useMemo(() => {
    return disabled ? colors.grey : colors.primary;
  }, [disabled]);

  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.container, {backgroundColor}]}
      disabled={disabled}
      {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
