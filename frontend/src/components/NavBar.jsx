import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuthContext from '../auth/authProvider';

const NavBar = ({ showLogout }) => {
  const { logOut } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('header.brand')}</Navbar.Brand>
        <Nav className="ms-auto">
          {showLogout && (
            <Button variant="primary" onClick={logOut}>
              {t('header.logOut')}
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
