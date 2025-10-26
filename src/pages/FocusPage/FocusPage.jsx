import React from "react";
import { TimerHeader } from "./Components/TimerHeader";
import { Timer } from "./Components/timer";
import styles from "./FocusPage.module.scss";
import { useAuth } from "@/context/AuthContext";

export function FocusPage() {
  const { study } = useAuth();
  return (
    <div className={styles.wrapper}>
      <TimerHeader study={study} />
      <Timer study={study} />
    </div>
  );
}
