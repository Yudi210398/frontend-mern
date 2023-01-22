import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHttp } from "../../shared/components/util/http-hook.js";
import UserKerangka from "../components/UserKerangka.js";

function Users() {
  const { sendRequest } = useHttp();
  const lokasi = useLocation();
  const navigete = useNavigate();
  const [getData, setData] = useState(null);
  const queruParam = new URLSearchParams(lokasi.search);
  const asending = queruParam.get("sort") === "asc";
  const handler = () => {
    navigete(`/user?sort=${asending ? "desc" : "asc"}`, { replace: false });
  };

  try {
    useEffect(() => {
      const dataFetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/users`
        );
        await setData(hasil.allUser);
        return hasil;
      };
      dataFetch();
    }, [sendRequest]);
  } catch (err) {
    console.log(err.message);
  }
  return (
    <Fragment>
      <br />
      <div className="container">
        {getData && (
          <button onClick={handler} className="btn btn-warning">
            Balik Data
          </button>
        )}
      </div>
      {getData && <UserKerangka items={getData} />}
      {!getData && <h1 className="text-center">Data Tidak Bisa di Fetch</h1>}
    </Fragment>
  );
}

export default Users;
