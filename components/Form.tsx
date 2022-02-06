import { useState } from 'react';
import Router from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { LoginFormSchema } from 'utils/schemas/authValidation';

import { LoginForm, ILoginRes } from 'types/User';

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(LoginFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: LoginForm) => {
    setLoading(true);
    try {
      const { data } = await axios.post<ILoginRes>('/api/user/auth', formData);
      localStorage.setItem('token', data.token);
      Router.push('/analytics');
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
        Login
      </Typography>
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
          <TextField {...field} label="Password" variant="standard" error={!!errors.password} />
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
        Login
      </LoadingButton>
    </Box>
  );
};

export default Form;
