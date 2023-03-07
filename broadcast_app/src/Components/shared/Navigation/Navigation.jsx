import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../helper/helper";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const state = useSelector((state) => state.auth);
  const check = state.isAuth && state.user.activated ? true : false;
  const dispatch = useDispatch();
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  async function handelLogout() {
    try {
      const data = await logout();
      console.log(data);
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <nav className={`${styles.navbar} border-b-2`}>
      <div className="text-gray-50 flex gap-x-2 text-lg">
        <img src="/images/logo.png" alt="logo" />
        <span className="">
          <NavLink to="/">ABIR BROADCAST</NavLink>
        </span>
      </div>
      <div className="flex gap-x-4">
        <div className="cursor-pointer">
          {check ? (
            <img
              className="ring-4 ring-blue-600 rounded-full"
              src={
                check
                  ? `${process.env.REACT_APP_STATIC_URL}${state.user.avatar}`
                  : "/images/avatar.png"
              }
              alt="avatar"
              width={45}
              height={50}
            />
          ) : (
            ""
          )}
        </div>
        {check ? (
          <button
            className={`flex justify-center items-center`}
            onClick={handelLogout}
            type="button"
          >
            {" "}
            <img src="/images/logout.png" alt="logo" />
          </button>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navigation;
