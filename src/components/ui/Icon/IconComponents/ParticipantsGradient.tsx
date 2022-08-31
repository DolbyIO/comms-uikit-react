/* eslint-disable react/destructuring-assignment */
import type { SVGComponent } from './index';

const SvgParticipantsGradient = (props: SVGComponent) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-testid={props.testID}
    fill={props.fill || 'currentColor'}
  >
    <path
      fill="url(#participants-gradient_svg__a)"
      d="M23.325 13.725a.75.75 0 0 1-1.05-.15 4.836 4.836 0 0 0-3.9-1.95.75.75 0 1 1 0-1.5 2.25 2.25 0 1 0-2.212-2.672.752.752 0 0 1-.883.629.75.75 0 0 1-.59-.91 3.75 3.75 0 1 1 6.216 3.469 6.356 6.356 0 0 1 2.569 2.034.749.749 0 0 1-.15 1.05Zm-5.25 6.197a.76.76 0 0 1-.347 1.003.872.872 0 0 1-.328.075.76.76 0 0 1-.675-.422 5.259 5.259 0 0 0-9.45 0 .75.75 0 0 1-1.003.347.76.76 0 0 1-.347-1.003 6.759 6.759 0 0 1 3.337-3.225 4.5 4.5 0 1 1 5.476 0 6.759 6.759 0 0 1 3.337 3.225ZM12 16.125a3 3 0 1 0-3-3 3.01 3.01 0 0 0 3 3Zm-5.625-5.25a.75.75 0 0 0-.75-.75 2.25 2.25 0 1 1 2.213-2.672.75.75 0 1 0 1.471-.281 3.75 3.75 0 1 0-6.215 3.469 6.356 6.356 0 0 0-2.569 2.034.75.75 0 1 0 1.2.9 4.837 4.837 0 0 1 3.9-1.95.75.75 0 0 0 .75-.75Z"
    />
    <defs>
      <linearGradient id="participants-gradient_svg__a" x1={0} y1={0} x2={24} y2={0} gradientUnits="userSpaceOnUse">
        <stop stopColor="#3E44FE" />
        <stop offset={1} stopColor="#BB5CFF" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgParticipantsGradient;
