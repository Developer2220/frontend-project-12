import NavBar from "../components/NavBar";
import Authform from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="/src/assets/avatar.jpg"
                    className="rounded-circle"
                    alt="Войти"
                  ></img>
                </div>
                <Authform />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// const LoginPage = () => {
//   return (
//     <div>LoginPage</div>
//   )
// }

// export default LoginPage
