import { object, string } from 'yup';
import { usernameRegExp } from '@shared/regexps';

const schema = object({
  username: string()
    .trim()
    .matches(usernameRegExp, 'Adres email jest nieprawidłowy.')
    .required('Musisz podać login.'),
  password: string()
    .trim()
    .required('Musisz podać hasło.'),
});

export default schema;
