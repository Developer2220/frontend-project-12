import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuthContext from '../auth/authProvider';
import { useCreateMutation } from '../API/auth';

const SignupForm = () => {
  const { logIn } = useAuthContext();
  const { t } = useTranslation();
  const [create] = useCreateMutation();

  const ModalSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.min'))
      .required(t('errors.required')),

    confirmPassword: Yup.string()
      .min(6, t('errors.min'))
      .required(t('errors.required'))
      .oneOf([Yup.ref('password'), null], t('errors.passwordMustMatch')),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={ModalSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const formData = {
          username: values.username,
          password: values.password,
        };

        try {
          const { data, error } = await create(formData);

          if (!data) {
            if (error.status === 409) {
              setFieldError('username', ' ');
              setFieldError('password', ' ');
              setFieldError('confirmPassword', t('errors.userExists'));
            }
            return;
          }
          logIn(data.token, data.username);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              placeholder={t('signupPage.username')}
              className={`form-control ${
                touched.username && errors.username ? 'is-invalid' : ''
              }`}
              required
            />
            <label className="form-label" htmlFor="username">
              {t('signupPage.username')}
            </label>
            {touched.username && errors.username && (
              <div className="invalid-tooltip">{errors.username}</div>
            )}
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              name="password"
              placeholder="Пароль"
              className={`form-control ${
                touched.password && errors.password ? 'is-invalid' : ''
              }`}
              required
              autoComplete="current-password"
              type="password"
            />
            <label className="form-label" htmlFor="password">
              {t('signupPage.password')}
            </label>
            {touched.password && errors.password && (
              <div className="invalid-tooltip">{errors.password}</div>
            )}
          </div>
          <div className="form-floating mb-4">
            <Field
              id="confirmPassword"
              name="confirmPassword"
              placeholder={t('signupPage.password')}
              className={`form-control ${
                touched.confirmPassword && errors.confirmPassword
                  ? 'is-invalid'
                  : ''
              }`}
              required
              autoComplete="current-password"
              type="password"
            />
            <label className="form-label" htmlFor="confirmPassword">
              {t('signupPage.confirmPassword')}
            </label>
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="invalid-tooltip">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {t('signupPage.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
