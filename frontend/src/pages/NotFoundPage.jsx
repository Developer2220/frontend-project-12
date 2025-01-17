import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";

const NotFoundPage = () => {
  const {t} = useTranslation()
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="text-center">
        <img
          alt={t('notFoundPage.title')}
          className="img-fluid h-25"
          src="/src/assets/Search.svg"
        ></img>
        <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
        <p className="text-muted">
        {t('notFoundPage.nav')} <a href="/">{t('notFoundPage.link')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
