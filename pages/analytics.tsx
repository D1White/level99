import type { NextPage } from 'next';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from 'components/Header';
import Table from 'components/Table';
import LineChart from 'components/LineChart';

const Analitics: NextPage = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box sx={{ maxHeight: '100vh' }}>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          display: `flex`,
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${matches ? '76' : '84'}px 0 20px`,
          height: '100vh',
        }}
      >
        <LineChart />

        <Table />
      </Container>
    </Box>
  );
};

export default Analitics;
