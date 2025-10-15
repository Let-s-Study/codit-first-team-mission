import { useState, useEffect } from "react";
import PauseIcon from "../../../assets/ic_pause.png";
import PlayIcon from "../../../assets/ic_play.png";
import RestartIcon from "../../../assets/ic_restart.png";

function Timer() {
  const [initialTime, setInitialTime] = useState(30 * 60);
  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(initialTime / 60));

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  });
  const handleDisplayClick = () => {
    if (!isRunning) {
      setIsEditing(true);
    }
  };
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "enter") {
      const newMinutes = Number(editValue);
      if (!isNaN(newMinutes) && newMinutes > 0) {
        const newSeconds = newMinutes * 60;
        setInitialTime(newSeconds);
        setSecondsLeft(newSeconds);
        setIsEditing(false);
      }
    }
  };
  const viewedTime = () => {
    // 타이머 외형
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const viewedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${viewedSeconds}`;
  };
  const handleInputBlur = () => {
    setIsEditing(false);
    setEditValue(String(initialTime / 60));
  };

  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
    // 타이머 정지
  };
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialTime);
    //타이머 초기화
  };

  return (
    <div className="wrapper">
      <div className="attention">
        <h3>오늘의 집중</h3>
      </div>
      <div className="timer">
        <div className="stopWatch">
          {isEditing ? (
            <input
              type="number"
              value={editValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              autoFocus
              className="timeInput"
            />
          ) : (
            <div onClick={handleDisplayClick} className="timeDisplay">
              {viewedTime()}
            </div>
          )}
        </div>
        <div className="buttonWrapper">
          {isRunning ? ( // 정지시 버튼 안보이게
            <button type="button" className="pauseButton" onClick={handlePause}>
              <img src={PauseIcon} alt="Pause" />
            </button>
          ) : (
            <div className="blank"></div>
          )}
          <button
            type="button"
            className="button"
            onClick={handleStart}
            disabled={isRunning}
          >
            <img src={PlayIcon} />
            <p>Start!</p>
          </button>
          {isRunning ? (
            <button type="button" className="resetButton" onClick={handleReset}>
              <img src={RestartIcon} alt="Restart" />
            </button>
          ) : (
            <div className="blank"></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Timer;
