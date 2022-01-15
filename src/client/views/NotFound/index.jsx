import React, {
  useCallback, useEffect, useState, memo,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MaxViewHeight from '@client/components/MaxViewHeight';
import LazyImage from '@client/components/LazyImage';
import { setTitle } from '@client/helpers/documentMeta';
import notFound from '@client/assets/images/undraw_page_not_found_su7k 1.svg';

const NotFound = memo(() => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    e.preventDefault();

    navigate('/');
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => (seconds <= 0 ? navigate('/') : setSeconds((state) => state - 1)),
      1000,
    );

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    setTitle('404');
  }, []);

  return (
    <MaxViewHeight classNames="position-relative bg-white">
      <div className="w-100 position-center">
        <div className="not-found m-auto">
          <LazyImage
            src={notFound}
            alt="Napis 404"
            divClassName="mb-4 px-2"
            imgClassName="img-fluid"
            height={477}
            width={1075}
          />
          <div>Nie znaleziono strony.</div>
          <div>
            Powrót do{' '}
            <Link to="/" title="Wróć do strony głównej" onClick={handleClick}>
              strony głównej
            </Link>{' '}
            za {seconds}.
          </div>
        </div>
      </div>
    </MaxViewHeight>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
