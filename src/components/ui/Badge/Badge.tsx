/* eslint-disable react/jsx-props-no-spreading */
import type { ColorKey } from '../../../common';
import cx from 'classnames';

import useTheme from '../../../hooks/useTheme';
import Space from '../Space/Space';
import Text from '../Text/Text';

import styles from './Badge.module.scss';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  content?: string | number | boolean;
  backgroundColor?: ColorKey;
  contentColor?: ColorKey;
  testID?: string;
};

const Badge = ({ content, backgroundColor = 'grey.700', contentColor = 'white', testID, ...props }: BadgeProps) => {
  const { getColor } = useTheme();
  return (
    <Space
      ph={content ? 'xs' : undefined}
      testID={testID}
      className={cx(styles.badge, !content && styles.noContent)}
      style={{ backgroundColor: getColor(backgroundColor) }}
      {...props}
    >
      {content && (
        <Text
          type="captionSemiBold"
          align="center"
          color={contentColor}
          style={{ fontWeight: '500', letterSpacing: '0.03em' }}
        >
          {content}
        </Text>
      )}
    </Space>
  );
};

export default Badge;
