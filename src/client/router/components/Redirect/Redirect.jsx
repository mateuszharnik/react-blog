import { memo, useEffect } from 'react';
import { useRouter } from '@client/router/hooks';
import { redirectPropTypes } from '@client/prop-types/redirectPropTypes';
import Box from '@client/components/Box';

const Redirect = memo(({ to }) => {
  const { history: { replace } } = useRouter();

  useEffect(() => {
    replace(to);
  }, []);

  return <Box />;
});

Redirect.displayName = 'Redirect';

Redirect.propTypes = redirectPropTypes.props;

Redirect.defaultProps = redirectPropTypes.default;

export default Redirect;
