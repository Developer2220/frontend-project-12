import { Formik, Form, Field } from "formik";

const Authform = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="col-12 col-md-6 mt-3 mt-md-0">
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <label htmlFor="userName">Ваш ник</label>
          <Field
            id="userName"
            name="userName"
            placeholder="Ваш ник"
            className="form-control"
            required
          />
        </div>
        <div className="form-floating mb-4">
          <label htmlFor="password">Пароль</label>
          <Field
            id="password"
            name="password"
            placeholder="Пароль"
            className="form-control"
            required
            autocomplete="current-password"
            type="password"
          />
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          Войти
        </button>
      </Form>
    </Formik>
  );
};
export default Authform;
