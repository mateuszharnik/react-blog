import { useContext } from 'react';
import { sentryService } from '@client/services/sentryService';

const useSafeContext = ({ context: Context }) => {
  const context = useContext(Context);

  if (!context) {
    const error = new Error('Component must be in the scope of the context.');

    sentryService.captureException(error);

    throw error;
  }

  return context;
};

export default useSafeContext;
