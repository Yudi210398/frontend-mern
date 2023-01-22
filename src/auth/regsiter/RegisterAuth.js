import React, { Fragment, useRef } from "react";
import FormikControl from "../../FormikForm/FormikControl";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import Alert from "react-bootstrap/Alert";
import * as Yup from "yup";
import "./logout.css";
import { useHttp } from "../../shared/components/util/http-hook";
import ImagePriview from "../../shared/components/ImagePriview.js";
import TextError from "../../FormikForm/TextError";
export const FORMATIMAGES = ["image/jpg", "image/jpeg", "image/png"];
function LogoutAuth() {
  const refs = useRef(null);
  const navigate = useNavigate();

  const {
    errorValidate,
    sendRequest,
    setErorrPesan,
    setErrorValidate,
    errorPesan,
  } = useHttp();
  const initialValues = {
    nama: "",
    email: "",
    photo: null,
    deskripsi: "",
    password: "",
    ulangPassword: "",
  };
  const validationSchema = Yup.object({
    nama: Yup.string().required("Harus diIsi"),
    email: Yup.string().email("email gk sesuai").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(5, `minimal password 5 huruf`),
    ulangPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Harus Sama")
      .required("Isi woy"),
    deskripsi: Yup.string().required("Harus diIsi").min(7, "minimal 7 huruf"),
    photo: Yup.mixed()
      .nullable()
      .required()
      .test(
        "FILE_SIZE",
        "File terlalu besar",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "FILE_FORMAT",
        "Format tidak sesuai, harus gambar",
        (value) => !value || (value && FORMATIMAGES.includes(value?.type))
      ),
  });

  const onSubmit = async (values) => {
    setErrorValidate(false);

    console.log(values);
    try {
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("email", values.email);
      formData.append("deskripsi", values.deskripsi);
      formData.append("password", values.password);
      formData.append("passValidasi", values.ulangPassword);
      formData.append("gambar", values.photo);
      console.log(formData);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/users/daftar`,
        "POST",
        formData
      );
      alert("Berhasil Daftar Silahkan Login");
      navigate("/auth/login", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err.message);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-2 text-center">
            <h1>Register</h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6">
            {errorValidate && (
              <Alert
                variant="danger"
                onClose={() => setErrorValidate(false)}
                dismissible
              >
                <Alert.Heading>{errorPesan}</Alert.Heading>
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="text"
                      label="Nama"
                      name="nama"
                      placeholder="masukan data"
                      error={formik?.errors.nama}
                      toucheds={formik.touched.nama?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="masukan data"
                      error={formik?.errors.email}
                      toucheds={formik.touched.email?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <FormikControl
                      control="textarea"
                      // control='chakraInput'
                      type="text"
                      label="Deskripsi"
                      name="deskripsi"
                      placeholder="masukan data"
                      error={formik?.errors.deskripsi}
                      toucheds={formik.touched.deskripsi?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="masukan data"
                      error={formik?.errors.password}
                      toucheds={formik.touched.password?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="password"
                      label="Konfirmasi Password"
                      name="ulangPassword"
                      placeholder="masukan data"
                      error={formik?.errors.ulangPassword}
                      toucheds={formik.touched.ulangPassword?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <input
                      hidden
                      ref={refs}
                      control="input"
                      // control='chakraInput'
                      type="file"
                      label="Image Upload"
                      name="photo"
                      error={formik?.errors.photo}
                      touched={formik.touched.photo?.toString()}
                      onBlur={formik.handleBlur}
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("photo", e.target.files[0])
                      }
                    />
                    <div>
                      <button
                        onClick={() => refs.current.click()}
                        className="btn btn-danger"
                        type="button"
                      >
                        Upload Image
                      </button>
                    </div>
                    <ErrorMessage component={TextError} name="photo" />
                    <br /> <br />
                    {formik.values.photo && (
                      <ImagePriview gambar={formik.values.photo} />
                    )}
                    {formik.values.photo && (
                      <span>
                        <br /> <br />
                      </span>
                    )}
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LogoutAuth;
