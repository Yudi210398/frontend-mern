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
        <Card.Img variant="top" src={`http://localhost:5000/${props.gambar}`} />
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
              to={`/place/edit/${props._id}`}
            >
              Edit Data
            </Link>
          )}
          {data && (
            <Link
              className="tombol btn bg-success"
              to={`/place/edit/formik/${props._id}`}
            >
              Edit Data Formik
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
            />
          )}
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default ListItemPlaces;
