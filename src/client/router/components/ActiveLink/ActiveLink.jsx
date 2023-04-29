import { memo, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import { useRouter } from '@client/router/hooks';
import { getUrl } from '@client/utils/routerUtils';
import { activeLinkPropTypes, activeLinkDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';

const PATH = 'navigation';

const ActiveLink = memo(({
  id, to, linkClassName, children, ...restProps
}) => {
  const { t } = useTranslation();
  const { location: { path } } = useRouter();

  const isActive = useMemo(() => path === getUrl(to), [to, path]);

  return (
    <Link
      to={to}
      className={`${linkClassName}${isActive ? ' exact-active' : ''}`}
      aria-current={isActive ? 'page' : null}
      {...restProps}
    >
      <>
        {children}
        {isActive && (
          <span
            data-testid={`${testsConstants.NAV_LINK_TEXT_HELPER}${id ? `-${id}` : ''}`}
            className="visually-hidden"
          >
            {' '}
            {t(`${PATH}.YOU_ARE_HERE`)}
          </span>
        )}
      </>
    </Link>
  );
});

ActiveLink.displayName = 'ActiveLink';

ActiveLink.propTypes = activeLinkPropTypes;

ActiveLink.defaultProps = activeLinkDefaultProps;

export default ActiveLink;
