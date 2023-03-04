import React, { useState } from "react";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepFullName from "../Steps/StepName/StepName";

const stepsObj = {
  1: StepFullName,
  2: StepAvatar,
};
function Active() {
  const [stepNo, setStep] = useState(1);

  const Steps = stepsObj[stepNo];
  const onNext = () => {
    setStep(stepNo + 1);
  };
  return (
    <div>
      <Steps onNext={onNext} />
    </div>
  );
}

export default Active;
