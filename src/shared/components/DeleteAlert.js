import { Button } from "react-bootstrap";
import { Fragment } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHttp } from "./util/http-hook";
import { useSelector } from "react-redux";
function DeleteAlert(props) {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.loginShow.Login);
  const submit = () => {
    confirmAlert({
      title: props.title,
      message: props.pesanbody,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL_API}/places/${props._id}`,
                "DELETE",
                null,
                {
                  Authorization: `Dog ${token}`,
                }
              );
              props.onDelete(props._id);
            } catch (err) {
              props.onDeleteError(err.message);
              throw err;
            }
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
      <Button variant="danger" onClick={submit}>
        Delete
      </Button>
    </Fragment>
  );
}

export default DeleteAlert;
