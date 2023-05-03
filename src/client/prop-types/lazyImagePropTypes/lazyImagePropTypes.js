import { string, number } from 'prop-types';

export const lazyImagePropTypes = {
  src: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  alt: string,
  divClassName: string,
  imgClassName: string,
  spinnerClassName: string,
};

export const lazyImageDefaultProps = {
  alt: '',
  divClassName: '',
  imgClassName: '',
  spinnerClassName: '',
};
