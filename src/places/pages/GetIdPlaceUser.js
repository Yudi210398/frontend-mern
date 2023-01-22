import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../shared/components/util/http-hook";
import PlaceIdUSer from "../components/PlaceIdUSer";

function GetIdPlaceUser() {
  const [data, setData] = useState("");
  const { sendRequest } = useHttp();
  const { id } = useParams();
  try {
    useEffect(() => {
      const fetch = async () => {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/places/user/${id}`
        );
        await setData(data.dataPlace);
        if (data === "") throw new Error("Tidak ada Data");
        return data;
      };
      fetch();
    }, [id, sendRequest]);
  } catch (err) {
    console.log(err);
  }

  return (
    <Fragment>
      <div className="container">
        <br />
        <div className="row justify-content-center text-center">
          <PlaceIdUSer items={data} />
        </div>
      </div>
    </Fragment>
  );
}

export default GetIdPlaceUser;
