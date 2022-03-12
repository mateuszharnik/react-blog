import { object, string } from 'yup';

const schema = object({
  password: string()
    .trim()
    .required('Musisz podać hasło.'),
});

export default schema;
