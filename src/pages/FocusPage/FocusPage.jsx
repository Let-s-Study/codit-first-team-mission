import React from "react";
import { TimerHeader } from "./Components/TimerHeader";

import { Timer } from "./Components/timer";
import Style from "./FocusPage.module.scss";

export function FocusPage() {
  return (
    <div className={Style.wrapper}>
      <TimerHeader />
      <Timer />
    </div>
  );
}
