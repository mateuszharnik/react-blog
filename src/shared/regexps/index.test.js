import { emailRegExp } from './index';

describe('Regexps', () => {
  it('should pass', async () => {
    const email = 'test@test.pl';

    expect(email).toMatch(emailRegExp);
  });
});
