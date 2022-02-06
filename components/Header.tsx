import { FC } from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

import { IUser } from 'types/User';

interface HeaderProps {
  user?: IUser;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const Router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    Router.replace('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{ display: `flex`, justifyContent: `space-between`, alignItems: 'center' }}
        >
          {user && (
            <>
              <Typography>{user.name}</Typography>
              <Button style={{ color: '#fff' }} endIcon={<LogoutIcon />} onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
