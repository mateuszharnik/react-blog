import { useContext } from 'react';
import { sentryService } from '@client/services/sentryService';

const sentry = sentryService.getInstance();

const useSafeContext = ({ context: Context }) => {
  const context = useContext(Context);

  if (!context) {
    const error = new Error('Component must be in the scope of the context.');

    sentry?.captureException(error);

    throw error;
  }

  return context;
};

export default useSafeContext;
