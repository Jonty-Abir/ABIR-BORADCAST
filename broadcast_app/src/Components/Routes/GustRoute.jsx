import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GustRoute({ children, ...rest }) {
  const { user, isAuth } = useSelector((state) => state.auth);

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
