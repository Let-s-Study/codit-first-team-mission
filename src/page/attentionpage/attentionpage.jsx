import React from "react";
import Header from "../../components/Layout/Header";
import TimerHeader from "./components/timerHeader";
import Timer from "./components/timer";
import "./attentionpage.scss";

function AttentionPage() {
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

export default AttentionPage;
