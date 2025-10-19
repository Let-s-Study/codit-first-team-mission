import React from "react";
import TimerHeader from "./components/timerHeader";

import Timer from "./components/timer";
import Style from "./focuspage.module.scss";

function FocusPage() {
  return (
    <div className={Style.wrapper}>
      <TimerHeader />
      <Timer />
    </div>
  );
}

export default FocusPage;
