import React from "react";
import { TimerHeader } from "./Components/TimerHeader";
import { Timer } from "./Components/timer";
import styles from "./FocusPage.module.scss";

export function FocusPage() {
  return (
    <div className={styles.wrapper}>
      <TimerHeader />
      <Timer />
    </div>
  );
}
