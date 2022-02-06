import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const RegistrationFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
