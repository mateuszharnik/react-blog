import { format } from 'util';

console.error = (...args) => {
  const message = format(...args);

  if (/(Invalid prop|Failed prop type|Missing required prop)/gi.test(message)) {
    throw new Error(message);
  }
};
