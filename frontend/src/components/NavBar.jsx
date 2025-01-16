import { useTranslation } from "react-i18next";
import useAuthContext from "../auth/authProvider";

const NavBar = ({ showLogout }) => {
  const { logOut } = useAuthContext();
  const {t} = useTranslation()

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('header.brand')}
        </a>
        {showLogout && (
          <button type="button" className="btn btn-primary" onClick={logOut}>
          {t('header.logOut')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
