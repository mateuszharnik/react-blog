import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { refPropTypes, refDefaultProps } from '@client/prop-types';
import Portal from '@client/components/Portal';

const PATH = 'common.skipNavLink';

const SkipNavLink = memo(({ target }) => {
  const { t } = useTranslation();

  const handleScroll = useCallback(async (e) => {
    e.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 0 });
    } catch (error) {
      return null;
    }
  }, [target]);

  return (
    <Portal to="skip-nav">
      <a
        href="#main"
        className="skip-nav-link px-3 py-2"
        title={t(`${PATH}.GO_TO_MAIN_CONTENT`)}
        onClick={handleScroll}
      >
        {t(`${PATH}.SKIP_NAVIGATION`)}
      </a>
    </Portal>
  );
});

SkipNavLink.displayName = 'SkipNavLink';

SkipNavLink.propTypes = {
  target: refPropTypes,
};

SkipNavLink.defaultProps = {
  target: refDefaultProps,
};

export default SkipNavLink;
