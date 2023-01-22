import { Fragment, useEffect, useCallback, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Barnavbar from "./shared/components/Barnavbar.js";
import { useDispatch, useSelector } from "react-redux";
import EditDataFormik from "./places/pages/EditDataFormik.js";
import { isLogin } from "./Data/authslice.js";

const Users = lazy(() => import("./users/pages/Users.js"));
const Places = lazy(() => import("./places/pages/Places.js"));
const MyPlaces = lazy(() => import("./places/pages/MyPlaces.js"));

const LoginAuth = lazy(() => import("./auth/login/LoginAuth.js"));

const GetIdPlaceUser = lazy(() => import("./places/pages/GetIdPlaceUser.js"));

const RegisterAuth = lazy(() => import("./auth/regsiter/RegisterAuth"));

function App() {
  console.log(process.env.REACT_APP_BACKEND);
  const data = useSelector((state) => state.loginShow.Login);

  let routes;
  const dispatch = useDispatch();

  const onLogin = useCallback(
    (userId, token) => dispatch(isLogin({ userId, token })),
    [dispatch]
  );

  useEffect(() => {
    const dataBrowser = JSON.parse(localStorage.getItem("userData"));
    if (
      dataBrowser &&
      dataBrowser.token &&
      dataBrowser.waktuExpied > new Date().getTime()
    )
      onLogin(dataBrowser.id, dataBrowser.token);
    else localStorage.removeItem("userData");
  }, [onLogin]);

  if (data) {
    routes = (
      <Fragment>
        <Route
          path="/user"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <Users />
            </Suspense>
          }
        />
        ;
        <Route
          path="/places"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <MyPlaces />
            </Suspense>
          }
        />
        <Route
          path="/place/new"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <Places />
            </Suspense>
          }
        />
        <Route
          path="/place/edit/formik/:tempatId"
          element={<EditDataFormik />}
        />
        <Route
          path="/placesId/:id"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <GetIdPlaceUser />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/user" replace />} />;
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route
          path="/user"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <Users />
            </Suspense>
          }
        />
        ;
        <Route
          path="/auth/login"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <LoginAuth />
            </Suspense>
          }
        />
        ;
        <Route
          path="/auth/logout"
          element={
            <Suspense fallback={<h1 className="text-center">load</h1>}>
              <RegisterAuth />
            </Suspense>
          }
        />
        ;
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
