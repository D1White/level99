import type { NextPage } from 'next';
import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';

import Header from 'components/Header';
import Form from 'components/Form';

const Home: NextPage = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          display: `flex`,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${matches ? '76' : '84'}px 0 20px`,
          height: '100vh',
        }}
      >
        <Form />
      </Container>
    </>
  );
};

export default Home;
