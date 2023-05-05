import { memo, useEffect } from 'react';
import { useRouter } from '@client/router/hooks';
import { redirectPropTypes, redirectDefaultProps } from '@client/prop-types';

const Redirect = memo(({ to }) => {
  const { history: { replace } } = useRouter();

  useEffect(() => {
    replace(to);
  }, []);

  return <div />;
});

Redirect.displayName = 'Redirect';

Redirect.propTypes = redirectPropTypes;

Redirect.defaultProps = redirectDefaultProps;

export default Redirect;
