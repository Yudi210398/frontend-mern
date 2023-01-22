import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

function InputForm(props) {
  const contenInput =
    props.element === "input" ? (
      <Form.Control
        {...props}
        className={
          props.error && props.toucheds ? "border border-danger" : null
        }
      />
    ) : (
      <div className="form-floating">
        <textarea
          {...props}
          className={
            props.error && props.toucheds
              ? "border border-danger form-control"
              : `form-control`
          }
          placeholder="Leave a comment here"
          id="floatingTextarea2"
        ></textarea>
        <label htmlFor="floatingTextarea2">Masukan Data</label>
      </div>
    );
  return (
    <Fragment>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={props.htmlFor}>{props.label}</Form.Label>
        {contenInput}
        {props.error && props.toucheds ? (
          <div className="text-danger">{props.error}</div>
        ) : null}
      </Form.Group>
    </Fragment>
  );
}

export default InputForm;
