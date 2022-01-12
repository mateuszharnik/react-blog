import React, {
  useCallback, useEffect, useState, useRef, memo,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MaxViewHeight from '@client/components/MaxViewHeight';
import LazyImage from '@client/components/LazyImage';
import { setTitle } from '@client/helpers/documentMeta';
import notFoundImage from '@client/assets/images/undraw_page_not_found_su7k 1.svg';

const NotFound = memo(() => {
  const [seconds, setSeconds] = useState(10);
  const intervalRef = useRef();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      clearInterval(intervalRef.current);
      navigate('/');
    },
    [intervalRef],
  );

  const counting = useCallback(() => {
    let time = seconds;

    return () => {
      if (time <= 0) {
        clearInterval(intervalRef.current);
        navigate('/');
      } else {
        setSeconds((state) => state - 1);
        time -= 1;
      }
    };
  }, [intervalRef]);

  useEffect(() => {
    const callback = counting();

    intervalRef.current = setInterval(callback, 1000);
  }, [intervalRef, counting]);

  useEffect(() => () => clearInterval(intervalRef.current), [intervalRef]);

  useEffect(() => {
    setTitle('404');
  }, []);

  return (
    <MaxViewHeight classList="position-relative bg-white">
      <div className="w-100 position-center">
        <div className="not-found m-auto">
          <LazyImage
            src={notFoundImage}
            alt="Napis 404"
            divClassName="mb-6 px-2"
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
