export const defaultTime = 1666535128027;

export const notExistingId = '000000000000000000000000';

export const getCSRFTokens = ({ headers, body }) => {
  const [csrfCookie] = headers['set-cookie'][0].split(';');
  const csrfToken = body.CSRFToken;

  return [csrfCookie, csrfToken];
};
