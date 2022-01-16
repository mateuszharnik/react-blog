import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';
import LazyImage from '@client/components/LazyImage';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';

const NavImageLink = memo(({
  onBlur, to, title, src, gender, className,
}) => {
  const image = useMemo(() => {
    if (src) return src;

    return gender === 'female' ? female : male;
  }, [src, gender]);

  return (
    <div className="nav__link-image-wrapper">
      <Link className={className} to={to} title={title} onBlur={onBlur} data-nav>
        <LazyImage
          divClassName="nav__link-image"
          width={36}
          height={36}
          alt="Zdjęcie użytkownika"
          src={image}
        />
      </Link>
    </div>
  );
});

NavImageLink.displayName = 'NavImageLink';

NavImageLink.propTypes = {
  gender: string.isRequired,
  className: string.isRequired,
  src: string,
  title: string,
  to: string,
  onBlur: func,
};

NavImageLink.defaultProps = {
  onBlur: () => {},
  title: 'Przejdź do panelu administratora',
  to: '/admin',
  src: '',
};

export default NavImageLink;
