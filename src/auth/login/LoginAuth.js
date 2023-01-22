import React, { Fragment } from "react";
import LoginForm from "../../FormikForm/LoginForm";
function LoginAuth() {
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-2 text-center">
            <h1>Login</h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginAuth;
