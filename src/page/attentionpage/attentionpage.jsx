import React from "react";
import Header from "../../components/Layout/Header";
import TimerHeader from "./components/timerHeader";
import Timer from "./components/timer";
import "./attentionpage.scss";

function attentionpage() {
  return (
    <div className="wrapper">
      <Header />
      <div>
        <TimerHeader />
        <Timer />
      </div>
    </div>
  );
}

export default attentionpage;
