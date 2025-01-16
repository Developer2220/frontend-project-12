import { Formik, Form, Field } from "formik";
import useAuthContext from "../auth/authProvider";
import useCreateNewUser from "../hooks/useCreateNewUser";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const { token, logIn } = useAuthContext();
  // console.log('useAuthContext', useAuthContext())
 const {t} = useTranslation();
  const { create } = useCreateNewUser();

  const ModalSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Обязательное поле"),

    confirmPassword: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Обязательное поле")
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ModalSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        const formData = {
          username: values.username,
          password: values.password,
        };
        console.log("formData", formData);

        try {
          const result = await create(formData);
          console.log("Ответ от сервера:", result);

          if (!result.success) {
            if (result.status === 409) {
              setFieldError("username", " ");
              setFieldError("password", " ");
              setFieldError(
                "confirmPassword",
                "Такой пользователь уже существует"
              );
            }
            return;
          }
          localStorage.setItem("token", result.data.token);
          // logIn(token, result.username);
          logIn(token, result.data.username);
        } catch (error) {
          // console.log('error', error)
          console.error("Ошибка", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              placeholder={t('signupPage.username')}
              className={`form-control ${
                touched.username && errors.username ? "is-invalid" : ""
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
                touched.password && errors.password ? "is-invalid" : ""
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
              placeholder="Пароль"
              className={`form-control ${
                touched.confirmPassword && errors.confirmPassword
                  ? "is-invalid"
                  : ""
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
