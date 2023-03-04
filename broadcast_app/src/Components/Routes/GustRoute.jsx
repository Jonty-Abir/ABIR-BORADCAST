import React from "react";
import { Navigate } from "react-router-dom";

function GustRoute({ children, ...rest }) {
  const isAuth = false;
  const user = {
    activated: true,
  };
  return (
    <>
      {isAuth ? (
        !user.activated ? (
          <Navigate to="/active" replace={true} />
        ) : (
          <Navigate to="/rooms" replace={true} />
        )
      ) : (
        children
      )}
    </>
  );
}

export default GustRoute;
