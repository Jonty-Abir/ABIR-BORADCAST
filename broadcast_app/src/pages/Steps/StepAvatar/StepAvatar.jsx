import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Components/shared/Card/Card";
import { setAvatar } from "../../../store/activeSclice";
import styles from "./StepAvatar.module.css";

import Button from "../../../Components/shared/Button/Button";
import Loader from "../../../Components/shared/Loader/Loader";
import { activateUser } from "../../../helper/helper";
import { setAuth } from "../../../store/authSlice";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activeSclice);
  const [image, setImage] = useState("/images/avatar.png");
  const [loading, setLoading] = useState(false);
  // const [unMounted, setUnMounted] = useState(false);

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  async function submit() {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const data = await activateUser({ name, avatar });
      setLoading(false);

      if (data.auth) {
        // if (!unMounted) {
        dispatch(setAuth(data));
        // }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <>
      <Card title={`Hello, ${name}`} icon="logo">
        <p className={styles.subHeading}>How’s this picture?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={`${styles.avatarInput}`}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Submit" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
