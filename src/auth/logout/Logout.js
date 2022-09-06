import React, { Fragment } from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogout } from "../../Data/authslice";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
function Logout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = () => {
    confirmAlert({
      title: props.title,
      message: props.pesanbody,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(isLogout());
            localStorage.removeItem("userData");
            navigate("/auth/login", { replace: true });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Fragment>
      <button className="nav-link bg-transparent" onClick={submit}>
        {props.keluar}
      </button>
    </Fragment>
  );
}

export default Logout;
