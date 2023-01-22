import React, { Fragment, useRef } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "../../FormikForm/FormikControl";
import { useState } from "react";
import ImagePriview from "../../shared/components/ImagePriview";
import * as Yup from "yup";
import { useHttp } from "../../shared/components/util/http-hook";
import { Alert } from "react-bootstrap";
import { FORMATIMAGES } from "../../auth/regsiter/RegisterAuth";
import { useSelector } from "react-redux";
function EdithPlaceFormik(props) {
  const token = useSelector((state) => state.loginShow.Login);
  const {
    errorValidate,
    sendRequest,
    setErorrPesan,
    setErrorValidate,
    errorPesan,
  } = useHttp();
  const [foto, setFoto] = useState(false);
  const refs = useRef(null);
  const navigate = useNavigate();
  const idplace = props?.dataItems[0]?._id;
  const getData = props.dataItems;
  const initialValues = {
    namaTempat: getData.length >= 1 ? getData[0].namaTempat : "",
    deskripsi: getData.length >= 1 ? getData[0].deskripsi : "",
    photo: "",
  };

  const validationSchema = yup.object().shape({
    namaTempat: yup.string().required("*penting Harus Diisi"),
    deskripsi: yup.string().required("penting").min(5),
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
    console.log(values);
    try {
      setErrorValidate(false);
      const formData = new FormData();
      formData.append("namaTempat", values.namaTempat);
      formData.append("deskripsi", values.deskripsi);
      formData.append("gambar", values.photo);
      await sendRequest(`/api/places/${idplace}`, "PATCH", formData, {
        Authorization: `Dog ${token}`,
      });
      navigate("/places", { replace: true });
    } catch (err) {
      console.log(err);
      setErrorValidate(true);
      setErorrPesan(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <br />
        <h1 className="text-center">EDIT DATA</h1>
        <br />
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
              enableReinitialize={true}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="name"
                      label="Nama Tempat"
                      name="namaTempat"
                      value={formik.values.namaTempat}
                      placeholder="masukan data"
                      error={formik?.errors.namaTempat}
                      toucheds={formik.touched.namaTempat?.toString()}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      // control='chakraInput'
                      type="name"
                      label="Deskripisi"
                      name="deskripsi"
                      value={formik.values.deskripsi}
                      placeholder="masukan data"
                      error={formik?.errors.deskripsi}
                      toucheds={formik.touched.deskripsi?.toString()}
                      onBlur={formik.handleBlur}
                    />
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
                      onChange={(e) => {
                        formik.setFieldValue("photo", e.target.files[0]);

                        // if (!formik.values?.photo?.lastModified) setFoto(false);

                        setFoto(true);
                      }}
                    />
                    <br />
                    <div>
                      <button
                        onClick={() => refs.current.click()}
                        className="btn btn-danger"
                        type="button"
                      >
                        Upload Image
                      </button>
                    </div>
                    {formik.errors.photo && (
                      <p className="error">{formik.errors.photo}</p>
                    )}
                    <br /> <br />
                    {foto && formik.values.photo?.lastModified && (
                      <ImagePriview gambar={formik.values.photo} />
                    )}
                    {foto && (
                      <span>
                        <br /> <br />
                      </span>
                    )}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EdithPlaceFormik;
