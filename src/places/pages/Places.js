import React, { Fragment, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import FormikControl from "../../FormikForm/FormikControl";
import { useSelector } from "react-redux";
import { useHttp } from "../../shared/components/util/http-hook";
import { useNavigate } from "react-router-dom";
import TextError from "../../FormikForm/TextError";
import { FORMATIMAGES } from "../../auth/regsiter/RegisterAuth";
import ImagePriview from "../../shared/components/ImagePriview.js";
function Places() {
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
    namaTempat: "",
    deskripsi: "",
    photo: "",
  };

  const token = useSelector((state) => state.loginShow.Login);

  const validationSchema = Yup.object({
    namaTempat: Yup.string().required("Harus di isi"),
    deskripsi: Yup.string()
      .required("Harus diisi")
      .min(5, "Minimal 5 kata kawan"),
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
    try {
      const formData = new FormData();
      formData.append("namaTempat", values.namaTempat);
      formData.append("deskripsi", values.deskripsi);
      formData.append("gambar", values.photo);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/places`,
        "POST",
        formData,
        {
          Authorization: `Dog ${token}`,
        }
      );
      navigate("/places", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err.message);
    }
  };

  return (
    <Fragment>
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <h1 className="text-center">ADD PLACE FORM</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            <div className="col-8">
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
                        type="namaTempat"
                        label="Nama Tempat"
                        name="namaTempat"
                        placeholder="masukan data"
                        error={formik?.errors.namaTempat}
                        toucheds={formik.touched.namaTempat?.toString()}
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
                          Upload Image Place
                        </button>
                      </div>
                      <ErrorMessage component={TextError} name="photo" />
                      <br />
                      {formik.values.photo && (
                        <ImagePriview gambar={formik.values.photo} />
                      )}
                      {formik.values.photo && (
                        <span>
                          <br /> <br />
                        </span>
                      )}

                      <FormikControl
                        control="textarea"
                        name="deskripsi"
                        label="Deskripsi"
                        error={formik?.errors.deskripsi}
                        toucheds={formik.touched.deskripsi?.toString()}
                        onBlur={formik.handleBlur}
                      />
                      <br />
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Places;

// ! contoh

/* 

import React, { Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import InputForm from "../../shared/components/InputForm";
import "./newPlace.css";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  namaTempat: yup.string().required("*penting Harus Diisi"),
  alamat: yup.string().required("*penting Harus Diisi"),
  deskripsi: yup.string().required("penting").min(5),
});

function Places() {
  const formik = useFormik({
    initialValues: {
      namaTempat: "",
      deskripsi: "",
      alamat: "",
    },

    onSubmit: (value, { resetForm }) => {
      console.log(value);

      resetForm({ values: "" });
    },
    validationSchema,
  });

  const { namaTempat, deskripsi, alamat } = formik.errors;

  return (
    <Fragment>
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <h1 className="text-center">ADD PLACE FORM</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            <div className="col-8">
              <Form onSubmit={formik.handleSubmit}>
                <InputForm
                  type="text"
                  element="input"
                  placeholder="masukan data"
                  label="Nama Tempat"
                  name="namaTempat"
                  onChange={formik.handleChange}
                  value={formik.values.namaTempat}
                  error={formik.errors.namaTempat}
                  onBlur={formik.handleBlur}
                  toucheds={formik.touched.namaTempat?.toString()}
                />

                <InputForm
                  type="text"
                  element="input"
                  placeholder="masukan data"
                  label="Alamat"
                  name="alamat"
                  onChange={formik.handleChange}
                  value={formik.values.alamat}
                  error={formik.errors.alamat}
                  onBlur={formik.handleBlur}
                  toucheds={formik.touched.alamat?.toString()}
                />

                <InputForm
                  placeholder="masukan data"
                  label="Deskripsi"
                  name="deskripsi"
                  onChange={formik.handleChange}
                  value={formik.values.deskripsi}
                  error={formik.errors.deskripsi}
                  onBlur={formik.handleBlur}
                  toucheds={formik.touched.deskripsi?.toString()}
                />

                <br />
                <Button
                  className={
                    !namaTempat &&
                    formik.touched.namaTempat &&
                    !deskripsi &&
                    formik.touched.deskripsi &&
                    !alamat &&
                    formik.touched.alamat
                      ? ""
                      : "disabled"
                  }
                  variant="primary"
                  type="submit"
                > 
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Places;



*/
