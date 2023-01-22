import React from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./listData.css";

import ModalMap from "../../shared/components/ModalMap";
function ListItemIdUser(props) {
  const idLogin = useSelector((state) => state.loginShow.userId);
  const { id } = useParams();
  const hasil = id === idLogin;

  return (
    <div className="col-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_BACKEND_GAMBAR_API}/${props.gambar}`}
        />
        <Card.Body>
          <Card.Title>{props.namaTempat}</Card.Title>
          <Card.Text>{props.deskripsi}</Card.Text>
          <Card.Text>{props.alamat}</Card.Text>
          <ModalMap
            judul={props.namaTempat}
            alamat={props.alamat}
            kordinat={props.kordinat}
          />
          {hasil && (
            <Link
              className="tombol btn bg-warning"
              to={`/place/edit/formik/${props._id}`}
            >
              Edit Data
            </Link>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListItemIdUser;
