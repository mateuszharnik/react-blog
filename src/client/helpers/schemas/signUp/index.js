import {
  object, string, boolean, ref,
} from 'yup';
import { alphanumRegExp, emailRegExp } from '@client/helpers/regexps';

const schema = object({
  username: string()
    .trim()
    .matches(alphanumRegExp, 'Nazwa użytkownika może zawierać tylko cyfry oraz małe i duże litery.')
    .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki.')
    .max(32, 'Nazwa użytkownika może mieć maksymalnie 32 znaki.')
    .required('Musisz podać nazwę użytkownika.'),
  email: string()
    .trim()
    .matches(emailRegExp, 'Adres email jest nieprawidłowy.')
    .required('Musisz podać adres email.'),
  password: string()
    .trim()
    .min(8, 'Hasło musi mieć minimum 8 znaków.')
    .max(32, 'Hasło może mieć maksymalnie 32 znaki.')
    .required('Musisz podać hasło.'),
  confirm_password: string()
    .trim()
    .oneOf([ref('password')], 'Hasła nie są takie same.')
    .required('Musisz powtórzyć hasło.'),
  gender: string()
    .oneOf(['kobieta', 'mężczyzna'], 'Musisz wybrać między kobietą a mężczyzną.')
    .lowercase()
    .required('Musisz podać płeć.'),
  is_terms_of_use_accepted: boolean()
    .oneOf([true], 'Musisz zaakceptować regulamin.'),
});

export default schema;
