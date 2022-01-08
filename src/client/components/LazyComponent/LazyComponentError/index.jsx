import React, { useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import LazyComponentWrapper from '@client/components/LazyComponent/LazyComponentWrapper';
import LazyImage from '@client/components/LazyImage';
import bugImage from '@client/assets/images/undraw_fixing_bugs_w7gi 1.svg';

const LazyComponentError = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    window.location.reload(true);
  };

  return (
    <LazyComponentWrapper>
      <div className="lazy-component-error m-auto">
        <LazyImage
          src={bugImage}
          alt="Błąd na stronie"
          divClassName="mb-6 px-2"
          imgClassName="img-fluid"
          height={283}
          width={400}
        />
        <strong className="d-block mb-4">
          <div>Nie udało się załadować tej strony.</div>
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
              <FontAwesomeIcon icon={faCircleNotch} spin fixedWidth />
            </span>
          )}
        </button>
      </div>
    </LazyComponentWrapper>
  );
});

export default LazyComponentError;
