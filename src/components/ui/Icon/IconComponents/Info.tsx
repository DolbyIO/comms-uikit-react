/* eslint-disable react/destructuring-assignment */
import type { SVGComponent } from './index';

const SvgInfo = (props: SVGComponent) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    data-testid={props.testID}
    fill={props.fill || 'currentColor'}
  >
    <path
      fill={props.fill || 'currentColor'}
      d="M10 .25A9.75 9.75 0 1 0 19.75 10 9.76 9.76 0 0 0 10 .25Zm0 18A8.25 8.25 0 1 1 18.25 10 8.26 8.26 0 0 1 10 18.25Zm1.5-3.75a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10a.75.75 0 0 1 0-1.5H10a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1 .75.75ZM8.687 5.875a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
    />
  </svg>
);

export default SvgInfo;
