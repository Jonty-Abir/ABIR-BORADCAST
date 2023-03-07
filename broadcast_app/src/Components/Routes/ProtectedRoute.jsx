import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const { user, isAuth } = useSelector((state) => state.auth);

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
