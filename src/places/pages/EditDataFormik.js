import React from "react";
import { useHttp } from "../../shared/components/util/http-hook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EdithPlaceFormik from "../components/EdithPlaceFormik";
function EditDataFormik() {
  const { tempatId } = useParams();
  const { sendRequest } = useHttp();
  const [data, setData] = useState([]);
  const creatorId = useSelector((state) => state.loginShow.userId);
  useEffect(() => {
    const fetchData = async () => {
      const getData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/places/user/${creatorId}`
      );
      await setData(getData.dataPlace);
    };
    fetchData();
  }, [sendRequest, creatorId]);
  const hasilnya = data.filter((datas) => datas._id.toString() === tempatId);
  return <EdithPlaceFormik dataItems={hasilnya} />;
}

export default EditDataFormik;
