import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { isLogin } from "../Data/authslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useHttp } from "../shared/components/util/http-hook";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errorValidate,
    sendRequest,
    setErrorValidate,
    setErorrPesan,
    errorPesan,
  } = useHttp();
  const onLogin = (userid) => dispatch(isLogin(userid));

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("email gk sesuai").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(5, `minimal password 5 huruf`),
  });

  const onSubmit = async (values) => {
    try {
      const hasilss = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(hasilss);
      onLogin(hasilss.userId);
      navigate("/", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            {errorValidate && (
              <Alert
                variant="danger"
                onClose={() => setErrorValidate(false)}
                dismissible
              >
                <Alert.Heading>{errorPesan}</Alert.Heading>
              </Alert>
            )}

            <FormikControl
              control="input"
              // control='chakraInput'
              type="email"
              label="Email"
              name="email"
              placeholder="masukan data"
              error={formik?.errors.email}
              toucheds={formik.touched.email?.toString()}
            />
            <br />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              error={formik?.errors.password}
              onBlur={formik.handleBlur}
              placeholder="masukan data"
              toucheds={formik.touched.password?.toString()}
            />
            <br />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!formik.isValid}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
