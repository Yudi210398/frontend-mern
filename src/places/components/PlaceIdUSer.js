import React, { Fragment } from "react";
import ListItemIdUser from "./ListItemIdUser.js";

function PlaceIdUSer(props) {
  const kosong = <h1 className="display-4">Data Kosong</h1>;
  return (
    <Fragment>
      <br />
      <div className="container">
        <div className="row justify-content-center text-center">
          {props?.items?.length === 0 && kosong}
          {props?.items?.length > 0 &&
            props?.items?.map((place) => (
              <ListItemIdUser
                key={place._id}
                _id={place._id}
                gambar={place.gambar}
                namaTempat={place.namaTempat}
                alamat={place.alamat}
                creatorId={place.creatorId}
                kordinat={place.kordinat}
                deskripsi={place.deskripsi}
                onDeletePlace={props.deletesPlace}
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PlaceIdUSer;
