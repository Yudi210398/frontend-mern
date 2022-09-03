import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginAuth from "./auth/login/LoginAuth.js";
import RegisterAuth from "./auth/regsiter/RegisterAuth";
import MyPlaces from "./places/pages/MyPlaces.js";
import Places from "./places/pages/Places.js";
import Barnavbar from "./shared/components/Barnavbar.js";
import Users from "./users/pages/Users.js";
import { useSelector } from "react-redux";
import GetIdPlaceUser from "./places/pages/GetIdPlaceUser.js";
import EditDataFormik from "./places/pages/EditDataFormik.js";

function App() {
  const data = useSelector((state) => state.loginShow.Login);
  let routes;
  if (data) {
    routes = (
      <Fragment>
        <Route path="/user" element={<Users />} />;
        <Route path="/places" element={<MyPlaces />} />
        <Route path="/place/new" element={<Places />} />
        <Route
          path="/place/edit/formik/:tempatId"
          element={<EditDataFormik />}
        />
        <Route path="/placesId/:id" element={<GetIdPlaceUser />} />
        <Route path="*" element={<Navigate to="/user" replace />} />;
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/user" element={<Users />} />;
        <Route path="/auth/login" element={<LoginAuth />} />;
        <Route path="/auth/logout" element={<RegisterAuth />} />;
        <Route path="*" element={<Navigate to="/auth/login" replace />} />;
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Barnavbar />

      <Routes>{routes}</Routes>
    </Fragment>
  );
}

export default App;
