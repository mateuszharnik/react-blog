import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as Link } from 'react-router-dom';
import { activeLinkPropTypes } from '@client/prop-types/activeLinkPropTypes';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';

const PATH = 'navigation';

const ExactActiveLink = memo(({
  id, to, className, children, ...restProps
}) => {
  const { t } = useTranslation();

  return (
    <Link
      end
      to={to}
      className={className}
      {...restProps}
    >
      {({ isActive }) => (
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
      )}
    </Link>
  );
});

ExactActiveLink.displayName = 'ExactActiveLink';

ExactActiveLink.propTypes = activeLinkPropTypes.props;

ExactActiveLink.defaultProps = activeLinkPropTypes.default;

export default ExactActiveLink;
