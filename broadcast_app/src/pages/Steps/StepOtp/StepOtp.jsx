import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/shared/Button/Button";
import Card from "../../../Components/shared/Card/Card";
import TextInput from "../../../Components/shared/TextInput/TextInput";
import { verifyOtp } from "../../../helper/helper";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  // redux hook
  const state = useSelector((state) => state.auth.otp);
  const dispatch = useDispatch();
  /***_______     ________**/
  async function submit() {
    try {
      if (!otp) return;
      const data = await verifyOtp({
        otp,
        phone: state.phone,
        hash: state.hash,
      });
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="plock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
