import React, { useEffect, useState, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import MaxViewHeight from '@client/components/MaxViewHeight';
import LazyImage from '@client/components/LazyImage';
import { setTitle, setMeta, notFoundMeta } from '@client/helpers/documentMeta';
import notFound from '@client/assets/images/undraw_page_not_found_light_su7k.svg';

const NotFound = memo(() => {
  const [seconds, setSeconds] = useState(10);
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds <= 0) {
        navigate('/');
      } else {
        setSeconds((state) => state - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    addLayer();

    setTitle('404');
    setMeta(notFoundMeta());

    removeLayer();
  }, []);

  return (
    <MaxViewHeight className="position-relative bg-white">
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
            <Link
              to="/"
              title="Wróć do strony głównej"
            >
              <span>strony głównej</span>
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
