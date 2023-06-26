import {
  memo, useState, useMemo, useCallback, useEffect,
} from 'react';
import lazySizes from 'lazysizes';
import { lazyImagePropTypes } from '@client/prop-types/lazyImagePropTypes';
import { testsConstants } from '@shared/constants';
import Spinner from '@client/components/Spinner';
import Box from '@client/components/Box';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { getImageClassName } from './LazyImage.classes';

lazySizes.cfg.loadedClass = 'lazy-loaded-image';
lazySizes.cfg.lazyClass = 'lazy-load-image';
lazySizes.cfg.loadingClass = 'lazy-loading-image';

const LazyImage = memo(
  ({
    src, alt, divClassName, imgClassName, spinnerClassName, height, width,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const imageClassName = useMemo(() => getImageClassName({
      isLoaded, className: imgClassName,
    }), [isLoaded, imgClassName]);

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
    }, []);

    useEffect(() => {
      setIsLoaded(false);
    }, [src]);

    return (
      <Box
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
          <Box
            data-testid={testsConstants.LAZY_LOAD_IMAGE_SPINNER}
            className={spinnerClassName || null}
          >
            <Spinner />
          </Box>
        )}
      </Box>
    );
  },
);

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = lazyImagePropTypes.props;

LazyImage.defaultProps = lazyImagePropTypes.default;

export default LazyImage;
