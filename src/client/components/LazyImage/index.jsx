import React, {
  useState, useMemo, useCallback, memo,
} from 'react';
import { string, number } from 'prop-types';
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
      () => `lazy-load-image${isLoaded ? '' : ' lazy-load-image--hidden'} ${imgClassName}`.trim(),
      [isLoaded, imgClassName],
    );

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
    }, []);

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

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = {
  src: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  alt: string,
  divClassName: string,
  imgClassName: string,
  spinnerClassName: string,
};

LazyImage.defaultProps = {
  alt: '',
  divClassName: '',
  imgClassName: '',
  spinnerClassName: '',
};

export default LazyImage;
