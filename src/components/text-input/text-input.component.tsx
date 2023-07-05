import {IInputProps} from './text-input.types';
import {colors} from '~/resources/theme';
import styles from './text-input.styles';
import {
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  TextInput as TextInputRN,
  View,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';

export const TextInput: React.FC<IInputProps> = ({
  error,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInputRN>(null);
  const borderColor = useMemo(() => {
    return error ? colors.danger : isFocused ? colors.primary : colors.grey;
  }, [error, isFocused]);

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[styles.inputContentContainer, {borderColor}]}>
      <TextInputRN
        ref={inputRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={styles.input}
        {...props}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};
