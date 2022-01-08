const getWindowInnerHeight = (offsetHeight = 0) => {
  const { innerHeight } = window;

  if (offsetHeight <= 0) return innerHeight;

  return innerHeight > offsetHeight ? innerHeight - offsetHeight : innerHeight;
};

export default getWindowInnerHeight;
