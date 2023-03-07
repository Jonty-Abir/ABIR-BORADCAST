import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/shared/Button/Button";
import Card from "../../../Components/shared/Card/Card";
import { setName } from "../../../store/activeSclice";
import styles from "../StepPhoneEmail/StepPhoneEmail.module.css";

const StepUsername = ({ onNext }) => {
  const disPatch = useDispatch();
  const state = useSelector((state) => state.activeSclice);
  const [fullName, setFullName] = useState(state.name);

  /***_______     ________**/
  const nextStep = () => {
    if (!fullName) {
      return;
    }
    disPatch(setName(fullName));
    onNext()
  };

  return (
    <>
      <Card title="Enter you phone FullName" icon="fullName">
        <input
          className={styles.input}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={nextStep} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </>
  );
};

export default StepUsername;
