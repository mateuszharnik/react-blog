import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import lazySizes from 'lazysizes';
import Spinner from '@client/components/Spinner';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

lazySizes.cfg.loadedClass = 'lazy-loaded-image';
lazySizes.cfg.lazyClass = 'lazy-load-image';
lazySizes.cfg.loadingClass = 'lazy-loading-image';

const LazyImage = memo(
  ({
    src, alt, divClassName, imgClassName, spinnerClassName, height, width,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const className = useMemo(
      () => `lazy-load-image ${isLoaded ? '' : 'lazy-load-image--hidden'} ${imgClassName}`.trim(),
      [isLoaded, imgClassName],
    );

    const handleLoad = () => {
      setIsLoaded(true);
    };

    return (
      <div className={divClassName || null}>
        <img
          alt={alt}
          data-src={src}
          height={height}
          width={width}
          className={className}
          onLoad={handleLoad}
        />
        {!isLoaded && (
          <div className={spinnerClassName || null}>
            <Spinner />
          </div>
        )}
      </div>
    );
  },
);

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  alt: PropTypes.string,
  divClassName: PropTypes.string,
  imgClassName: PropTypes.string,
  spinnerClassName: PropTypes.string,
};

LazyImage.defaultProps = {
  alt: '',
  divClassName: '',
  imgClassName: '',
  spinnerClassName: '',
};

export default LazyImage;
