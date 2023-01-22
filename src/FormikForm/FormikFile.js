import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
function FormikFile(props) {
  const { label, name, ...rest } = props;
  return (
    <Fragment>
      <label htmlFor={name}>{label}</label>

      <Field
        _id={name}
        name={name}
        {...rest}
        className={
          rest.error && rest.toucheds
            ? "border border-danger form-control"
            : "form-control"
        }
      />
      <ErrorMessage component={TextError} name={name} />
    </Fragment>
  );
}

export default FormikFile;
