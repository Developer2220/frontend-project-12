import NavBar from "../components/NavBar";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="text-center">
        <img
          alt="Страница не найдена"
          className="img-fluid h-25"
          src="/src/assets/Search.svg"
        ></img>
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти <a href="/">на главную страницу</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
