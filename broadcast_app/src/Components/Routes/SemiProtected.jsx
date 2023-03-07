import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function SemiProtected({ children, ...rest }) {
  const { user, isAuth } = useSelector((state) => state.auth);
  

  return isAuth && user.activated ? (
    <Navigate to="/rooms" replace={true}></Navigate>
  ) : (
    isAuth ? children : <Navigate to="/authenticate" replace={true}></Navigate>
  );
}

export default SemiProtected;
