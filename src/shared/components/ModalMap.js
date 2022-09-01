import React, { Fragment } from "react";

import ReactDOM from "react-dom";

import { Modal, Button } from "react-bootstrap";
import MapLeaflet from "./MapLeaflet";

function MyVerticallyCenteredModal(props) {
  const conten = (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.judul}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> {props.alamat} </h4>
        <br />
        <MapLeaflet kordinat={props.kordinat} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  return ReactDOM.createPortal(conten, document.getElementById("modal"));
}

function ModalMap(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        View on Map
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </Fragment>
  );
}

export default ModalMap;
