import { Formik, Form, Field } from "formik";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../auth/authProvider";



const Authform = () => {
    const {authenticate} = useAuth();
    const {logIn} = useAuthContext();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
    //   onSubmit={async (values) => {
    //     await new Promise((r) => setTimeout(r, 500));
    //     alert(JSON.stringify(values, null, 2));
    //   }}

    onSubmit={async(values, { setSubmitting }) => {
        console.log(values)
        // fetch("/api/v1/login", {
        //     method: "POST",
        //     body: JSON.stringify(values),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log("Ответ от сервера:", data);
        //     setSubmitting(false); // Сброс флага после обработки
        // })
        // .catch(error => {
        //     console.error("Ошибка:", error);
        //     setSubmitting(false); // Сброс флага даже в случае ошибки
        // });


        const result = await authenticate(values);
        console.log("Ответ от сервера:", result.token);
        if (result) {
            localStorage.setItem("token", result.token);
            // localStorage.removeItem("token", result.token);
            console.log("Before calling logIn");
            logIn()
            console.log("After calling logIn");
        }
        setSubmitting(false);
    }}


    >
      <Form className="col-12 col-md-6 mt-3 mt-md-0">
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <Field
            id="username"
            name="username"
            placeholder="Ваш ник"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="username">Ваш ник</label>
        </div>
        <div className="form-floating mb-4">
          <Field
            id="password"
            name="password"
            placeholder="Пароль"
            className="form-control"
            required
            autocomplete="current-password"
            type="password"
          />
          <label className="form-label" htmlFor="password">Пароль</label>
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          Войти
        </button>
      </Form>
    </Formik>
  );
};

export default Authform;
