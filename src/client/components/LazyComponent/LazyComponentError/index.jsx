import React, { memo } from 'react';
import LazyComponentWrapper from '@client/components/LazyComponent/LazyComponentWrapper';
import bugImage from '@client/assets/images/undraw_fixing_bugs_w7gi 1.svg';

const LazyComponentError = memo(() => {
  const handleClick = () => {
    window.location.reload(true);
  };

  return (
    <LazyComponentWrapper>
      <div className="lazy-component-error m-auto">
        <img
          src={bugImage}
          alt="Błąd na stronie"
          className="img-fluid mb-6 px-2"
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
          onClick={handleClick}
        >
          Spróbuj odświeżyć stronę
        </button>
      </div>
    </LazyComponentWrapper>
  );
});

export default LazyComponentError;
