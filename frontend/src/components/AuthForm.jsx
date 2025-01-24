import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuthContext from '../auth/authProvider';
import { useAuthenticateMutation } from '../API/auth';

const Authform = () => {
  const { t } = useTranslation();
  const { logIn } = useAuthContext();
  const [authenticate] = useAuthenticateMutation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const { data, error } = await authenticate(values);
          if (data) {
            logIn(data.token, data.username);
          }
          if (error) {
            if (error.status === 'FETCH_ERROR') {
              toast.error(t('toast.errorNetwork'), { autoClose: 2000 });
            }
            if (error.status === 401) {
              setFieldError('username', t('errors.password'));
              setFieldError('password', t('errors.password'));
            } else {
              throw new Error();
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              placeholder={t('authForm.username')}
              className={`form-control ${
                touched.username && errors.username ? 'is-invalid' : ''
              }`}
              required
            />
            <label className="form-label" htmlFor="username">
              {t('authForm.username')}
            </label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              name="password"
              placeholder={t('authForm.password')}
              className={`form-control ${
                touched.password && errors.password ? 'is-invalid' : ''
              }`}
              required
              autoComplete="current-password"
              type="password"
            />
            <label className="form-label" htmlFor="password">
              {t('authForm.password')}
            </label>
            {touched.password && errors.password && (
              <div className="invalid-tooltip">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {t('authForm.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Authform;
