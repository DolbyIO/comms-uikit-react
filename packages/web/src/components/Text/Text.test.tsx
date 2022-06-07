import { defaultTheme as theme } from '@uikit/common';

import { render } from '../../utils/test-utils';

import CustomText from './Text';

const { colors } = theme;

const text = 'Sample text';
const testID = 'testID';
const color = 'primary.500';

describe('Text component', () => {
  test('Renders text passed as children', () => {
    const { getByText } = render(<CustomText>{text}</CustomText>);
    const regEx = new RegExp(text, 'i');
    expect(getByText(regEx)).not.toBeNull();
  });
  test('Passes TestID', () => {
    const { getByTestId } = render(<CustomText testID={testID}>{text}</CustomText>);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const align = 'center';
    const { getByTestId } = render(
      <CustomText testID={testID} color={color} type="H3" align={align}>
        {text}
      </CustomText>,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle(`color:${colors.primary[500]}`);
    expect(element).toHaveClass(`align-${align}`);
  });
  test('Handles uppercase on/off', () => {
    const { getByTestId, rerender } = render(<CustomText testID={testID}>{text}</CustomText>);
    const element = getByTestId(testID);
    expect(element).not.toHaveClass('uppercase');
    rerender(
      <CustomText testID={testID} uppercase>
        {text}
      </CustomText>,
    );
    expect(element).toHaveClass('uppercase');
  });
});
