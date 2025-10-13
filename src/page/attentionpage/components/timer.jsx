import React from "react";
import PauseIcon from "../../../assets/ic_pause.png";
import PlayIcon from "../../../assets/ic_play.png";
import RestartIcon from "../../../assets/ic_restart.png";

function Timer({ time }) {
  return (
    <div className="wrapper">
      <div className="attention">
        <h3>오늘의 집중</h3>
      </div>
      <div className="timer"> 
        <div className="stopWatch">{/* 시간 프롭 넣기 */}</div>
        <div className="buttonWrapper">
          <button
            type="button"
            className="pauseButton"
            onClick={handleStartPause}
          >
            <img src={PauseIcon} alt="Pause" />
          </button>
          <button type="button" className="button" onClick={handleStartPause}>
            <img src={PlayIcon} />
            <p>Start!</p>
          </button>
          <button
            type="button"
            className="restartButton"
            onClick={handleRestart}
          >
            <img src={RestartIcon} alt="Restart" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Timer;
