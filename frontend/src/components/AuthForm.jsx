import { Formik, Form, Field } from "formik";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../auth/authProvider";
import { useTranslation } from "react-i18next";

const Authform = () => {
  const { authenticate } = useAuth();
  const { token, logIn } = useAuthContext();
  const {t} = useTranslation();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}

      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        try {
          const result = await authenticate(values);
          console.log("Ответ от сервера:", result);
          if (result) {
            localStorage.setItem("token", result.token);
            logIn(token, result.username);
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Ошибка", error);
          setFieldError("username", "Неверные имя пользователя или пароль");
          setFieldError("password", "Неверные имя пользователя или пароль");
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
                touched.username && errors.username ? "is-invalid" : ""
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
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              required
              autocomplete="current-password"
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
