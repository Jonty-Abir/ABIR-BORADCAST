import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../Components/shared/Button/Button";
import Card from "../../../../Components/shared/Card/Card";
import { sendOtp } from "../../../../helper/helper";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    try {
      if (!phoneNumber) return;
      const data = await sendOtp({ phoneNo: phoneNumber });
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      onNext();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card title="Enter you phone number" icon="phone">
      <input
        className={styles.input}
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
