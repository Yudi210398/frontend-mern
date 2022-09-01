import React, { Fragment } from "react";
import ItemsUser from "./ItemsUser";
function UserKerangka(props) {
  const kosong = <h1 className="display-4">Data Kosong</h1>;
  return (
    <Fragment>
      <br />
      <div className="container">
        <div className="row justify-content-center text-center">
          {props.items.length === 0 && kosong}
          {props.items.length > 0 &&
            props.items.map((user) => {
              return (
                <ItemsUser
                  key={user._id}
                  _id={user._id}
                  nama={user.nama}
                  gambar={user.gambar}
                  places={user.places}
                  deskripsi={user.deskripsi}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}

export default UserKerangka;
