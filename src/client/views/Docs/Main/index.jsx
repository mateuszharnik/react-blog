import { memo, useEffect, useState } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';

const Main = memo(({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addLayer } = useStoreActions((actions) => actions.layer);
  const { fetchRefreshToken } = useStoreActions((actions) => actions.docs);
  const { config } = useStoreState((state) => state.config);

  useEffect(async () => {
    addLayer();

    try {
      if (!config.use_docs_password) {
        document.location.href = `${process.env.CLIENT_URL}/api/v1/docs`;
      } else {
        const response = await fetchRefreshToken();

        if (response.data?.docsToken) {
          document.location.href = `${process.env.CLIENT_URL}/api/v1/docs`;
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? null : children;
});

Main.displayName = 'Main';

Main.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

Main.defaultProps = {
  children: null,
};

export default Main;
