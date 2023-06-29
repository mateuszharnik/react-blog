import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { navImageLinkPropTypes } from '@client/prop-types/navImageLinkPropTypes';
import { routesConstants, valuesConstants, rolesConstants } from '@shared/constants';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';
import ExactActiveLink from '@client/router/components/ExactActiveLink';
import LazyImage from '@client/components/Images/LazyImage';
import Box from '@client/components/Box';

const PATH = 'navigation';

const NavImageLink = memo(({
  onBlur,
  type,
  src,
  gender,
  ...restProps
}) => {
  const { t } = useTranslation();

  const image = useMemo(() => {
    if (src) return src;

    return gender === valuesConstants.GENDER.FEMALE ? female : male;
  }, [src, gender]);

  const to = useMemo(() => (
    type === rolesConstants.USER
      ? routesConstants.PROFILE.DASHBOARD.ROOT
      : routesConstants.ADMIN.ROOT
  ), [type]);

  return (
    <Box className="nav__link-image-wrapper">
      <ExactActiveLink
        to={to}
        title={t(`${PATH}.nav.profile.TITLE`)}
        data-nav
        {...restProps}
        onBlur={onBlur}
      >
        <Box
          as="span"
          className="visually-hidden"
        >
          {t(`${PATH}.nav.profile.LINK`)}
        </Box>
        <LazyImage
          divClassName="nav__link-image"
          imgClassName="rounded-circle"
          width={36}
          height={36}
          alt={t(`${PATH}.USER_IMAGE`)}
          src={image}
        />
      </ExactActiveLink>
    </Box>
  );
});

NavImageLink.displayName = 'NavImageLink';

NavImageLink.propTypes = navImageLinkPropTypes.props;

NavImageLink.defaultProps = navImageLinkPropTypes.default;

export default NavImageLink;
