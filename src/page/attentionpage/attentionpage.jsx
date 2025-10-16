import React from "react";
import TimerHeader from "./components/timerHeader";
import Timer from "./components/timer";
import "./attentionpage.scss";

function AttentionPage() {
  return (
    <div className="wrapper">
      <TimerHeader />
      <Timer />
    </div>
  );
}

export default AttentionPage;
