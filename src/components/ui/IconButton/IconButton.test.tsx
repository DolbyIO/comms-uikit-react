// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react';

import theme from '../../../theme/defaultTheme';
import { render } from '../../../utils/tests/test-utils';

import IconButton from './IconButton';

const icon = 'microphone';
const testID = 'testID';
const backgroundColor = 'grey.800';
// eslint-disable-next-line no-console
const onClick = () => console.log('Hello');

const { colors } = theme;

describe('IconButton component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<IconButton testID={testID} icon={icon} onClick={onClick} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const size = 's';
    const { getByTestId } = render(
      <IconButton testID={testID} backgroundColor={backgroundColor} icon={icon} size={size} onClick={onClick} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveClass(`iconBtn`);
    expect(element).toHaveStyle(`background: ${colors.grey[800]}`);
    expect(element).toHaveClass(`size-${size}`);
  });
  test('Should method invoke after click', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(<IconButton testID={testID} icon={icon} onClick={mockOnClick} />);
    const element = getByTestId(testID);
    fireEvent.click(element);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
