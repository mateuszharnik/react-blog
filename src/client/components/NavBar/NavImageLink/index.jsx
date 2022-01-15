import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';
import LazyImage from '@client/components/LazyImage';
import female from '@client/assets/images/undraw_female_avatar_w3jk 1.svg';
import male from '@client/assets/images/undraw_male_avatar_323b 1.svg';

const NavImageLink = memo(({
  handleBlur, to, title, src, gender, classNames,
}) => {
  const image = useMemo(() => {
    if (src) return src;

    return gender === 'female' ? female : male;
  }, [src, gender]);

  return (
    <Link className={classNames} to={to} title={title} onBlur={handleBlur} data-nav>
      <LazyImage
        divClassName="nav__link-image"
        width={36}
        height={36}
        alt="Zdjęcie użytkownika"
        src={image}
      />
    </Link>
  );
});

NavImageLink.displayName = 'NavImageLink';

NavImageLink.propTypes = {
  gender: string.isRequired,
  classNames: string.isRequired,
  src: string,
  title: string,
  to: string,
  handleBlur: func,
};

NavImageLink.defaultProps = {
  handleBlur: () => {},
  title: 'Przejdź do panelu administratora',
  to: '/admin',
  src: '',
};

export default NavImageLink;
