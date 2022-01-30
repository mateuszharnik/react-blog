import React, { memo, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import LazyImage from '@client/components/LazyImage';
import bug from '@client/assets/images/undraw_fixing_bugs_w7gi.svg';

const Error = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    window.location.reload(true);
  }, []);

  return (
    <div className="error m-auto">
      <LazyImage
        src={bug}
        alt="Błąd na stronie"
        divClassName="mb-4 px-2"
        imgClassName="img-fluid"
        height={283}
        width={400}
      />
      <strong className="d-block mb-3">
        <div>Wystąpił nieoczekiwany błąd.</div>
      </strong>
      <button
        type="button"
        className="btn btn-outline-primary rounded-pill"
        title="Odśwież stronę"
        disabled={isLoading}
        onClick={handleClick}
      >
        Spróbuj odświeżyć stronę
        {isLoading && (
          <span className="ms-1">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              fixedWidth
            />
          </span>
        )}
      </button>
    </div>
  );
});

Error.displayName = 'Error';

export default Error;
