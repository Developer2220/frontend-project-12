import { useTranslation } from 'react-i18next';
import { Container, Image } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import search from '../assets/search.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container className="text-center">
        <Image
          alt={t('notFoundPage.title')}
          className="img-fluid h-25"
          src={search}
        />
        <h1 className="h4 text-muted mt-4">{t('notFoundPage.title')}</h1>
        <p className="text-muted">
          {t('notFoundPage.nav')}
          {' '}
          <a href="/">{t('notFoundPage.link')}</a>
        </p>
      </Container>
    </div>
  );
};

export default NotFoundPage;
