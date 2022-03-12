import React, {
  useEffect, useMemo, useState, memo,
} from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/Layouts/PageContainer';
import Spinner from '@client/components/Spinner';
import sanitize from '@client/helpers/purify';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  const [error, setError] = useState('');
  const { isLoading, about } = useStoreState((store) => store.about);
  const { user } = useStoreState((store) => store.user);
  const { fetchAbout } = useStoreActions((actions) => actions.about);
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  const contents = useMemo(() => {
    if (about?.html_contents) {
      return sanitize(about?.html_contents);
    }

    return about?.html_contents;
  }, [about]);

  const isAdmin = useMemo(() => user?.role?.type === 'ADMIN' || user?.role?.type === 'SUPERUSER', [user]);

  useEffect(async () => {
    setTitle('O blogu');
    setMeta(aboutMeta());

    if (!about) {
      const { status, data } = await fetchAbout();

      if (status !== 200) {
        setError(data.message);
      }
    }

    removeLayer();
  }, []);

  return (
    <PageContainer>
      {isLoading ? (
        <div className="position-component-center">
          <Spinner />
        </div>
      ) : (
        <>
          {error ? (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>
          ) : (
            <>
              {about?.html_contents ? (
                <div
                  className="markdown mt-2"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: contents }}
                />
              ) : (
                <div className="position-component-center">
                  Brak treści.
                </div>
              )}
              {isAdmin && (
                <div className="text-end my-2">
                  <Link
                    to="/o-blogu/edytuj"
                    title="Przejdź do edycji"
                  >
                    Edytuj tę stronę
                  </Link>
                </div>
              )}
            </>
          )}
        </>
      )}
    </PageContainer>
  );
});

About.displayName = 'About';

export default About;
