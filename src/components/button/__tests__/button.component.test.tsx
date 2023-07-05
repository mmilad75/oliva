import {Button} from '../button.component';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

describe('Button Component', () => {
  it('should render correctly', () => {
    const component = render(<Button title="Press Me" />);

    expect(component.toJSON).toMatchSnapshot();
  });

  it('should display title', () => {
    const title = 'Press Me';

    const {getByText} = render(<Button title={title} />);
    const Text = getByText(title);

    expect(Text).toBeDefined();
  });

  it('should call onPress when tapped', () => {
    const onPressMock = jest.fn();
    const {root} = render(<Button title="Press Me" onPress={onPressMock} />);

    fireEvent.press(root);

    expect(onPressMock).toHaveBeenCalled();
  });
});
