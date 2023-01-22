import React from "react";
import { Link } from "react-router-dom";
import "./itemCard.css";
function ItemsUser(props) {
  return (
    <div className="col-3">
      <div className="flip-card">
        <Link to={`/placesId/${props._id}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={`${process.env.REACT_APP_BACKEND_GAMBAR_API}/${props.gambar}`}
                alt="Avatar"
              />
            </div>
            <div className="flip-card-back">
              <h1>{props.nama}</h1>
              <p>" {props.deskripsi} "</p>
              <p>
                {props.places?.length === 0
                  ? "Belum ada Tempat Favorit"
                  : `Tempat Favorit ${props.places?.length}`}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ItemsUser;
