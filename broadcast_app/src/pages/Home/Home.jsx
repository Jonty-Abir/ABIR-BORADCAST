import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/shared/Button/Button";
import Card from "../../Components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  // const signInLinkStyle = {
  //   color: "#0077ff",
  //   fontWeight: "bold",
  //   textDecoration: "none",
  //   marginLeft: "10px",
  // };

  const onHandleFun = () => {
    navigate("/authenticate");
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to ABIR Bordcast!" icon="logo">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={onHandleFun} text="Let's go" />
        </div>
        {/* <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          <NavLink style={signInLinkStyle} to="/login">
            Sign in
          </NavLink>
        </div> */}
      </Card>
    </div>
  );
};

export default Home;
