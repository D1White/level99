import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: `flex`, justifyContent: `flex-end` }}>
          <Button style={{ color: '#fff' }} endIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
