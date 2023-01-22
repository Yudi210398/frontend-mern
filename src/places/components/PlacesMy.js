import React, { Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import ListItemPlaces from "./ListItemPlaces.js";

function PlacesMy(props) {
  const [errorDelete, setDelete] = useState("");
  const [show, setShow] = useState(false);
  const kosong = <h1 className="display-4">Data Kosong</h1>;

  const errorDeleteText = (err) => {
    setDelete(err);
    setShow(true);
  };
  return (
    <Fragment>
      <br />
      <div className="container">
        <div className="row justify-content-center text-center">
          <br />
          <br />
          <br />
          <h1>
            {show && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>{errorDelete}</Alert.Heading>
              </Alert>
            )}
          </h1>
          {props?.items?.places?.length === 0 && kosong}
          {props?.items?.places?.length > 0 &&
            props?.items?.places?.map((place) => (
              <ListItemPlaces
                key={place._id}
                _id={place._id}
                gambar={place.gambar}
                namaTempat={place.namaTempat}
                alamat={place.alamat}
                creatorId={place.creatorId}
                kordinat={place.kordinat}
                deskripsi={place.deskripsi}
                onDeletePlace={props.onTempatDelete}
                deleteOnError={errorDeleteText}
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PlacesMy;
