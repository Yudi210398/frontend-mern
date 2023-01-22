import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteAlert from "../../shared/components/DeleteAlert";
import { useSelector } from "react-redux";
import ModalMap from "../../shared/components/ModalMap";
import "./listData.css";
function ListItemPlaces(props) {
  const data = useSelector((state) => state.loginShow.Login);
  let alert = "Yakin hapus data";
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

          {data && (
            <Link
              className="tombol btn bg-warning"
              to={`/place/edit/formik/${props._id}`}
            >
              Edit Data
            </Link>
          )}

          <br />
          {data && (
            <DeleteAlert
              fixkeluar="Iya Hapus"
              title={alert}
              pesanbody={props.namaTempat}
              onDelete={props.onDeletePlace}
              _id={props._id}
              onDeleteError={props.deleteOnError}
            />
          )}
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default ListItemPlaces;
