import cx from 'classnames';

import useTheme from '../../../../hooks/useTheme';
import type { ColorKey, Sizes } from '../../../../theme/types';
import Icon from '../../Icon/Icon';
import type { IconComponentName } from '../../Icon/IconComponents';
import Space from '../../Space/Space';

import styles from './IconIndicator.module.scss';

export type IconIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: IconComponentName;
  backgroundColor?: ColorKey;
  iconColor?: ColorKey;
  size?: Extract<Sizes, 's' | 'm'>;
  variant?: 'square' | 'circle';
  testID?: string;
};

const IconIndicator = ({
  icon,
  backgroundColor,
  iconColor,
  size = 'm',
  variant = 'circle',
  testID,
  ...props
}: IconIndicatorProps) => {
  const { getColor } = useTheme();
  return (
    <Space
      testID={testID}
      className={cx(
        styles.indicator,
        styles[`size-${size}`],
        variant === 'square' && styles.square,
        variant === 'circle' && styles.circle,
      )}
      style={{
        backgroundColor: getColor(backgroundColor, 'rgba(255, 255, 255, 0.36)'),
      }}
      {...props}
    >
      <Icon testID={`${icon}Icon`} name={icon} color={iconColor} size={size === 'm' ? 's' : 'xs'} />
    </Space>
  );
};

export default IconIndicator;
