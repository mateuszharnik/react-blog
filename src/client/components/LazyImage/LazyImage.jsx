import {
  memo, useState, useMemo, useCallback, useEffect,
} from 'react';
import lazySizes from 'lazysizes';
import { lazyImagePropTypes, lazyImageDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';
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

    const imageClassName = useMemo(
      () => `lazy-load-image${isLoaded ? '' : ' lazy-load-image--hidden'} ${imgClassName}`.trim(),
      [isLoaded, imgClassName],
    );

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
    }, []);

    useEffect(() => {
      setIsLoaded(false);
    }, [src]);

    return (
      <div
        data-testid={testsConstants.LAZY_LOAD_IMAGE_WRAPPER}
        className={divClassName || null}
      >
        <img
          data-testid={testsConstants.LAZY_LOAD_IMAGE}
          alt={alt}
          data-src={src}
          height={height}
          width={width}
          className={imageClassName}
          onLoad={handleLoad}
        />
        {!isLoaded && (
          <div
            data-testid={testsConstants.LAZY_LOAD_IMAGE_SPINNER}
            className={spinnerClassName || null}
          >
            <Spinner />
          </div>
        )}
      </div>
    );
  },
);

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = lazyImagePropTypes;

LazyImage.defaultProps = lazyImageDefaultProps;

export default LazyImage;
