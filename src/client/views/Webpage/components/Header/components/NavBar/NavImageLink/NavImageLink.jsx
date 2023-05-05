import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveLink } from '@client/router/components';
import { navImageLinkPropTypes, navImageLinkDefaultProps } from '@client/prop-types';
import { routesConstants, valuesConstants, rolesConstants } from '@shared/constants';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';
import LazyImage from '@client/components/LazyImage';

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
    <div className="nav__link-image-wrapper">
      <ActiveLink
        to={to}
        end
        title={t(`${PATH}.nav.profile.TITLE`)}
        data-nav
        {...restProps}
        onBlur={onBlur}
      >
        {({ isActive }) => (
          <>
            <span className="visually-hidden">
              {t(`${PATH}.nav.profile.LINK`)}
            </span>
            {isActive && (
              <span className="visually-hidden">
                {' '}
                {t(`${PATH}.YOU_ARE_HERE`)}
              </span>
            )}
            <LazyImage
              divClassName="nav__link-image"
              imgClassName="rounded-circle"
              width={36}
              height={36}
              alt={t(`${PATH}.USER_IMAGE`)}
              src={image}
            />
          </>
        )}
      </ActiveLink>
    </div>
  );
});

NavImageLink.displayName = 'NavImageLink';

NavImageLink.propTypes = navImageLinkPropTypes;

NavImageLink.defaultProps = navImageLinkDefaultProps;

export default NavImageLink;
