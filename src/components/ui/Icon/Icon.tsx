/* eslint-disable react/jsx-props-no-spreading */
import type { Sizes, ColorKey } from '../../../common';
import cx from 'classnames';
import Color from 'color';
import React, { useMemo } from 'react';

import useTheme from '../../../hooks/useTheme';
import Space from '../Space/Space';

import styles from './Icon.module.scss';
import IconComponents from './IconComponents';
import type { IconComponentName } from './IconComponents';

export type ColorTone = 'light' | 'default' | 'dark';

export type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  name: IconComponentName;
  color?: ColorKey;
  colorTone?: ColorTone;
  size?: Extract<Sizes, 'xxs' | 'xs' | 's' | 'm' | 'l'>;
  testID?: string;
};

const Icon = ({ name, color, colorTone = 'default', size = 'm', testID, ...props }: IconProps) => {
  const { getColor, theme } = useTheme();

  const IconSVG = IconComponents[name];

  const handleFillColor = useMemo(() => {
    let fillColor = getColor(color, 'white');

    if (colorTone === 'light') fillColor = Color(fillColor).lighten(0.2).hex();
    else if (colorTone === 'dark') fillColor = Color(fillColor).darken(0.5).hex();
    else return fillColor;

    return fillColor;
  }, [color, colorTone, theme]);

  return (
    <Space testID={testID} className={cx(styles.icon, styles[`size-${size}`])} {...props}>
      <IconSVG testID="icon" fill={handleFillColor} />
    </Space>
  );
};

export default Icon;
