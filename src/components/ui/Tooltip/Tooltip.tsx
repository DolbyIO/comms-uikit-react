/* eslint-disable react/jsx-props-no-spreading */
import type { ColorKey } from '../../../common';
import cx from 'classnames';
import Color from 'color';
import { useEffect, useMemo, useRef, useState } from 'react';

import useTheme from '../../../hooks/useTheme';
import Space from '../Space/Space';
import Text from '../Text/Text';

import { countTooltipPosition } from './countTooltipPosition';
import styles from './Tooltip.module.scss';

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  position?: 'top' | 'bottom';
  children?: React.ReactNode;
  backgroundColor?: ColorKey;
  textColor?: ColorKey;
  testID?: string;
};

const Tooltip = ({ text, position, children, backgroundColor, textColor, testID, ...props }: TooltipProps) => {
  const { getColor } = useTheme();
  const [isActive, setIsActive] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [wrapperRect, setWrapperRect] = useState<DOMRect>();
  const [tooltipRect, setTooltipRect] = useState<DOMRect>();

  const setRects = () => {
    setWrapperRect(wrapperRef.current?.getBoundingClientRect());
    setTooltipRect(tooltipRef.current?.getBoundingClientRect());
  };

  useEffect(() => {
    setRects();
    window.addEventListener('resize', setRects);
    return () => {
      window.removeEventListener('resize', setRects);
    };
  }, [wrapperRef.current, tooltipRef.current, text]);

  const tooltipPosition = useMemo(
    () => countTooltipPosition({ position, wrapperRect, tooltipRect }),
    [position, wrapperRect, tooltipRect, isActive],
  );

  const tooltipBackgroundColor = useMemo(() => {
    if (backgroundColor) {
      return getColor(backgroundColor);
    }

    return Color(getColor('grey.700')).fade(0.2).hexa(); // fade(0.2) means reduce 0.5 opacity
  }, [backgroundColor]);

  const handleMouseEnter = () => {
    setRects();
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
      {...props}
    >
      {text && (
        <div
          className={cx(styles.tooltip, { [styles.hidden]: !isActive })}
          style={{ ...tooltipPosition }}
          data-testid={testID}
          ref={tooltipRef}
        >
          <Space pv="xxs" ph="xs" className={styles.content} style={{ backgroundColor: tooltipBackgroundColor }}>
            <Text color={getColor(textColor, 'white')} type="captionSmall">
              {text}
            </Text>
          </Space>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
