import { useState, FC } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { LoginFormSchema, RegistrationFormSchema } from 'utils/schemas/authValidation';
import serverDelay from 'utils/serverDelay';

import { LoginForm, ILoginRes } from 'types/User';

interface FormProps {
  type: 'login' | 'registration';
}

const Form: FC<FormProps> = ({ type }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(type === 'login' ? LoginFormSchema : RegistrationFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: LoginForm) => {
    setLoading(true);
    try {
      if (type === 'login') {
        const { data } = await axios.post<ILoginRes>('/api/user/auth', formData);
        await serverDelay(data);

        localStorage.setItem('token', data.token);
        Router.push('/analytics');
      } else if (type === 'registration') {
        await axios.post<ILoginRes>('/api/user/registration', formData);
        await serverDelay(formData);

        Router.push('/');
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
        '& .MuiTextField-root': { width: '100%' },
      }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" gutterBottom component="h1">
        {type === 'login' ? 'Login' : 'Registration'}
      </Typography>

      {type === 'registration' && (
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Name" variant="standard" error={!!errors.name} />
          )}
        />
      )}

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="standard"
            type="email"
            error={!!errors.email}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="standard"
            error={!!errors.password}
          />
        )}
      />

      <LoadingButton
        color="primary"
        variant="contained"
        type="submit"
        loading={loading}
        loadingIndicator="Loading..."
        sx={{
          width: '100%',
          maxWidth: '150px',
          marginTop: '30px',
        }}
      >
        {type === 'login' ? 'Sign in' : 'Sign up'}
      </LoadingButton>

      <Link href={type === 'login' ? '/registration' : '/'} passHref>
        <Typography variant="body1" component="a">
          {type === 'login' ? 'Sign up' : 'Sign in'}
        </Typography>
      </Link>
    </Box>
  );
};

export default Form;
