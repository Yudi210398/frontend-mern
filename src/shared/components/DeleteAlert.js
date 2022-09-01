import { Button } from "react-bootstrap";
import { Fragment } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHttp } from "./util/http-hook";

function DeleteAlert(props) {
  const { sendRequest } = useHttp();

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
                `http://localhost:5000/api/places/${props._id}`,
                "DELETE"
              );
            } catch (err) {
              console.log(err);
            }

            props.onDelete(props._id);
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
