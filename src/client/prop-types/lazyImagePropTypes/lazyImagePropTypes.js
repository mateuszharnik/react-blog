import { number, string } from 'prop-types';

export const lazyImagePropTypes = {
  props: {
    src: string.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    alt: string,
    divClassName: string,
    imgClassName: string,
    spinnerClassName: string,
  },
  default: {
    alt: '',
    divClassName: '',
    imgClassName: '',
    spinnerClassName: '',
  },
};
