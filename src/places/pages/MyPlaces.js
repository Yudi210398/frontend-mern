import React, { useEffect, useState } from "react";
import { useHttp } from "../../shared/components/util/http-hook";
import PlacesMy from "../components/PlacesMy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function MyPlaces() {
  const [data, setData] = useState("");
  const creatorId = useSelector((state) => state.loginShow.userId);
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  try {
    useEffect(() => {
      const dataFetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/places/myallplaces/${creatorId}`
        );
        await setData(hasil.dataUSer);
        return hasil;
      };
      dataFetch();
    }, [sendRequest, creatorId]);
  } catch (err) {
    console.log(err);
  }

  const onDeleteTempat = (dataId) => {
    navigate(`/placesId/${data._id}`, { replace: true });
  };

  return <PlacesMy onTempatDelete={onDeleteTempat} items={data} />;
}

export default MyPlaces;
