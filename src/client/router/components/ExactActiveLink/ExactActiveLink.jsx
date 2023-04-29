import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import { activeLinkPropTypes, activeLinkDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';

const PATH = 'navigation';

const ExactActiveLink = memo(({
  id, to, linkClassName, children, ...restProps
}) => {
  const { t } = useTranslation();

  return (
    <Link
      end
      to={to}
      className={linkClassName}
      {...restProps}
    >
      {({ isActive }) => (
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
      )}
    </Link>
  );
});

ExactActiveLink.displayName = 'ExactActiveLink';

ExactActiveLink.propTypes = activeLinkPropTypes;

ExactActiveLink.defaultProps = activeLinkDefaultProps;

export default ExactActiveLink;
