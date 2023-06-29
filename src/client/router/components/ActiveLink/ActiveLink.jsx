import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import { useRouter } from '@client/router/hooks';
import { getUrl } from '@client/utils/routerUtils';
import { activeLinkPropTypes } from '@client/prop-types/activeLinkPropTypes';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';
import { getActiveLinkClassName } from './ActiveLink.classes';

const PATH = 'navigation';

const ActiveLink = memo(({
  id, to, className, children, ...restProps
}) => {
  const { t } = useTranslation();
  const { location: { path } } = useRouter();

  const isActive = useMemo(() => path === getUrl(to), [to, path]);

  const linkClassName = useMemo(() => getActiveLinkClassName({
    isActive, className,
  }), [isActive, className]);

  return (
    <Link
      to={to}
      className={linkClassName}
      aria-current={isActive ? 'page' : null}
      {...restProps}
    >
      <>
        {children}
        {isActive && (
          <Box
            as="span"
            data-testid={`${testsConstants.NAV_LINK_TEXT_HELPER}${id ? `-${id}` : ''}`}
            className="visually-hidden"
          >
            {' '}
            {t(`${PATH}.YOU_ARE_HERE`)}
          </Box>
        )}
      </>
    </Link>
  );
});

ActiveLink.displayName = 'ActiveLink';

ActiveLink.propTypes = activeLinkPropTypes.props;

ActiveLink.defaultProps = activeLinkPropTypes.default;

export default ActiveLink;
