import React from "react";
import { Navigate } from "react-router-dom";

function SemiProtected({ children, ...rest }) {
  const isAuth = false;
  const user = {
    activated: true,
  };

  return isAuth && user.activated ? (
    <Navigate to="/rooms" replace={true}></Navigate>
  ) : (
    children
  );
}

export default SemiProtected;
