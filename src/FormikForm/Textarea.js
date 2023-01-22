import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <div className="form-floating">
        <Field
          as="textarea"
          _id={name}
          name={name}
          {...rest}
          className={
            rest.error && rest.toucheds
              ? "border border-danger form-control"
              : "form-control"
          }
        />
        <label htmlFor="floatingTextarea">{label}</label>
      </div>

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Textarea;
