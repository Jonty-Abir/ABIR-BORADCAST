import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const isAuth = true;
  const user = {
    activated: false,
  };
  return (
    <div>
      {isAuth ? (
        isAuth && user.activated ? (
          children
        ) : (
          <Navigate to="/active" replace={true} />
        )
      ) : (
        <Navigate to="/authenticate" replace={true} />
      )}
    </div>
  );
}

export default ProtectedRoute;
