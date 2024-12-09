import useAuthContext from "../auth/authProvider";

const NavBar = ({ showLogout }) => {
  const { logOut } = useAuthContext();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {showLogout && (
          <button type="button" className="btn btn-primary" onClick={logOut}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
