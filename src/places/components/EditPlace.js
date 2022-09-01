import React, { Fragment } from "react";
import InputForm from "../../shared/components/InputForm";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "../../shared/components/util/http-hook";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
const validationSchema = yup.object().shape({
  namaTempat: yup.string().required("*penting Harus Diisi"),
  deskripsi: yup.string().required("penting").min(5),
  gambar: yup.string().required("*penting Harus Diisi"),
});

function EditPlace(props) {
  const idplace = props?.dataItems[0]?._id;
  const navigate = useNavigate();
  const {
    errorValidate,
    sendRequest,
    setErorrPesan,
    setErrorValidate,
    errorPesan,
  } = useHttp();
  const getData = props.dataItems;
  const formik = useFormik({
    initialValues: {
      namaTempat: getData.length >= 1 ? getData[0].namaTempat : "",
      deskripsi: getData.length >= 1 ? getData[0].deskripsi : "",
      gambar: getData.length >= 1 ? getData[0].gambar : "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        setErrorValidate(false);

        await sendRequest(
          `http://localhost:5000/api/places/${idplace}`,
          "PATCH",
          JSON.stringify({
            namaTempat: values.namaTempat,
            deskripsi: values.deskripsi,
            gambar: values.gambar,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate("/places", { replace: true });
      } catch (err) {
        setErrorValidate(true);
        console.log(errorValidate);
        setErorrPesan(err.message);
      }
    },

    validationSchema,
  });

  const kosongData = (
    <h1 className="display-4 text-center">Data Tempat Tidak Ada</h1>
  );
  const { namaTempat, deskripsi, gambar } = formik.errors;

  return (
    <Fragment>
      <br />
      <div className="container">
        <h1 className="text-center">EDIT DATA</h1>
        <br />
        <div className="row justify-content-center">
          {getData.length === 0 && kosongData}

          <div className="col-6">
            <br />

            {errorValidate && (
              <Alert
                variant="danger"
                onClose={() => setErrorValidate(false)}
                dismissible
              >
                <Alert.Heading>{errorPesan}</Alert.Heading>
              </Alert>
            )}
            <Fragment>
              {!getData && (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {getData.length > 0 && (
                <Form onSubmit={formik.handleSubmit}>
                  <InputForm
                    type="text"
                    element="input"
                    placeholder="masukan data"
                    label="Nama Tempat"
                    name="namaTempat"
                    value={formik.values.namaTempat}
                    error={formik.errors.namaTempat}
                    onChange={formik.handleChange}
                    toucheds={"true"}
                  />
                  <InputForm
                    placeholder="masukan data"
                    label="Deskripsi"
                    name="deskripsi"
                    value={formik.values.deskripsi}
                    onChange={formik.handleChange}
                    toucheds={"true"}
                    error={formik.errors.deskripsi}
                  />

                  <InputForm
                    type="text"
                    element="input"
                    placeholder="masukan data"
                    label="Gambar"
                    name="gambar"
                    value={formik.values.gambar}
                    error={formik.errors.gambar}
                    onChange={formik.handleChange}
                    toucheds={"true"}
                  />

                  <Button
                    className={
                      !namaTempat && !gambar && !deskripsi ? "" : "disabled"
                    }
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditPlace;
