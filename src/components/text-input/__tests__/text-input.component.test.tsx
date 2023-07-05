import React from 'react';
import {TextInput} from '../text-input.component';
import {TextInput as TextInputRN} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

describe('Button Component', () => {
  it('should render correctly', () => {
    const component = render(<TextInput />);

    expect(component.toJSON).toMatchSnapshot();
  });

  it('should call onFocus when input is focused', () => {
    const onFocusMock = jest.fn();
    const {root} = render(<TextInput onFocus={onFocusMock} />);
    const Input = root.findByType(TextInputRN);
    fireEvent(Input, 'focus');

    expect(onFocusMock).toHaveBeenCalled();
  });

  it('should call onBlur when input is blured', () => {
    const onBlurMock = jest.fn();
    const {root} = render(<TextInput onBlur={onBlurMock} />);
    const Input = root.findByType(TextInputRN);
    fireEvent(Input, 'blur');

    expect(onBlurMock).toHaveBeenCalled();
  });

  it('should display error', () => {
    const errorMessage = 'Required!';

    const {getByText} = render(<TextInput error={errorMessage} />);
    const Error = getByText(errorMessage);

    expect(Error).toBeDefined();
  });
});
