import { format } from 'util';

// eslint-disable-next-line no-console
console.error = (...args) => {
  const message = format(...args);

  if (/(Invalid prop|Failed prop type|Missing required prop)/gi.test(message)) {
    throw new Error(message);
  }
};
