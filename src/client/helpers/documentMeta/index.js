/* eslint-disable import/prefer-default-export */
export const setTitle = (title = 'Mateusz Harnik', suffix = '| Blog o kodowaniu') => {
  const newTitle = `${title} ${suffix}`.trim();

  if (!newTitle) return null;

  document.title = newTitle;

  return newTitle;
};
