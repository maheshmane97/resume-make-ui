import "./App.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import MiniDrawer from "./component/dashboard/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "./reduxToolkit/Account/accountSlice";
import { isTokenValid } from "./utils/validToken";
import MultiNotification from "./component/NotificationSnackbar/MultipleNotification";

function App() {
  const { isLogin } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenValid()) {
      dispatch(setIsLogin(true));
      navigate("/resumemakerui/dashboard");
    } else {
      dispatch(setIsLogin(false));
    }
  }, []);
  return (
    <div>
      <MultiNotification />
      {isLogin ? (
        <>
          <MiniDrawer />
        </>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
}

export default App;
