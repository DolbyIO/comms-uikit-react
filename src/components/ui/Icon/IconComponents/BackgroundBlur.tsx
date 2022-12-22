/* eslint-disable react/destructuring-assignment */
import type { SVGComponent } from './index';

const BackgroundBlur = (props: SVGComponent) => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill={props.fill || 'currentColor'}
    data-testid={props.testID}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 3.05176e-05H2.00002C1.51781 3.05176e-05 1.05535 0.191588 0.714371 0.532563C0.373396 0.873537 0.181839 1.336 0.181839 1.81821V18.1818C0.181839 18.664 0.373396 19.1265 0.714371 19.4675C1.05535 19.8084 1.51781 20 2.00002 20H22C22.4822 20 22.9447 19.8084 23.2856 19.4675C23.6266 19.1265 23.8182 18.664 23.8182 18.1818V1.81821C23.8182 1.336 23.6266 0.873537 23.2856 0.532563C22.9447 0.191588 22.4822 3.05176e-05 22 3.05176e-05V3.05176e-05ZM8.36364 9.09092C8.36364 8.37172 8.57691 7.66867 8.97648 7.07067C9.37605 6.47268 9.94397 6.0066 10.6084 5.73137C11.2729 5.45614 12.004 5.38413 12.7094 5.52444C13.4148 5.66475 14.0627 6.01108 14.5713 6.51963C15.0798 7.02819 15.4262 7.67612 15.5665 8.38151C15.7068 9.08689 15.6348 9.81804 15.3596 10.4825C15.0843 11.147 14.6182 11.7149 14.0203 12.1144C13.4223 12.514 12.7192 12.7273 12 12.7273C11.0365 12.7243 10.1133 12.3402 9.43202 11.6589C8.75072 10.9776 8.36664 10.0544 8.36364 9.09092V9.09092ZM5.70456 18.1818C6.34326 17.0776 7.26117 16.1608 8.36616 15.5234C9.47116 14.886 10.7244 14.5505 12 14.5505C13.2756 14.5505 14.5288 14.886 15.6338 15.5234C16.7388 16.1608 17.6567 17.0776 18.2954 18.1818H5.70456ZM22 18.1818H20.3295C19.3706 15.989 17.5865 14.2621 15.3636 13.375C16.2572 12.6751 16.9101 11.7138 17.2314 10.6252C17.5527 9.53663 17.5264 8.37491 17.1562 7.30195C16.786 6.22899 16.0903 5.29825 15.166 4.63943C14.2418 3.98061 13.135 3.62653 12 3.62653C10.865 3.62653 9.75821 3.98061 8.83395 4.63943C7.9097 5.29825 7.21398 6.22899 6.84377 7.30195C6.47356 8.37491 6.44728 9.53663 6.7686 10.6252C7.08993 11.7138 7.74285 12.6751 8.63637 13.375C6.41349 14.2621 4.62944 15.989 3.67047 18.1818H2.00002V1.81821H22V18.1818Z" />
  </svg>
);

export default BackgroundBlur;