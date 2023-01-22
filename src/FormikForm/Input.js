import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        _id={name}
        name={name}
        {...rest}
        className={
          rest.error && rest?.toucheds
            ? "border border-danger form-control"
            : "form-control"
        }
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
