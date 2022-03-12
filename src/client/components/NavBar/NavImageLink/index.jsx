import React, { memo, useMemo } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { string, func } from 'prop-types';
import LazyImage from '@client/components/LazyImage';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';

const NavImageLink = memo(({
  onBlur, type, src, gender, className,
}) => {
  const image = useMemo(() => {
    if (src) return src;

    return gender === 'kobieta' ? female : male;
  }, [src, gender]);

  const to = useMemo(() => (type === 'USER' ? '/profil' : '/admin'), [type]);

  return (
    <div className="nav__link-image-wrapper">
      <Link
        className={className}
        to={to}
        end
        title="Wyświetl swój profil"
        onBlur={onBlur}
        data-nav
      >
        {({ isActive }) => (
          <>
            <span className="visually-hidden">Profil</span>{' '}
            {isActive && <span className="visually-hidden">(Jesteś tutaj)</span>}
            <LazyImage
              divClassName="nav__link-image"
              width={36}
              height={36}
              alt="Zdjęcie użytkownika"
              src={image}
            />
          </>
        )}
      </Link>
    </div>
  );
});

NavImageLink.displayName = 'NavImageLink';

NavImageLink.propTypes = {
  type: string.isRequired,
  gender: string.isRequired,
  className: string.isRequired,
  src: string,
  onBlur: func,
};

NavImageLink.defaultProps = {
  onBlur: () => {},
  src: '',
};

export default NavImageLink;
