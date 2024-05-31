import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { refPropTypes } from '@client/prop-types/refPropTypes';
import Link from '@client/router/components/Link';
import Portal from '@client/components/Portal';

const PATH = 'common.skipNavLink';

const SkipNavLink = memo(({ target, ...restProps }) => {
  const { t } = useTranslation();

  const handleScroll = useCallback(async (event) => {
    event.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 0 });
    } catch (error) {
      return null;
    }
  }, [target]);

  return (
    <Portal
      to="skip-nav"
      prepend
    >
      <Link
        to="#main"
        className="skip-nav-link px-3 py-2"
        title={t(`${PATH}.GO_TO_MAIN_CONTENT`)}
        {...restProps}
        onClick={handleScroll}
      >
        {t(`${PATH}.SKIP_NAVIGATION`)}
      </Link>
    </Portal>
  );
});

SkipNavLink.displayName = 'SkipNavLink';

SkipNavLink.propTypes = {
  target: refPropTypes.props,
};

SkipNavLink.defaultProps = {
  target: refPropTypes.default,
};

export default SkipNavLink;
