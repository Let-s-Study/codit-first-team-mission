import { useState, useEffect } from "react";
import PauseIcon from "@/assets/btn_pause.png";
import PlayIcon from "@/assets/ic_play.png";
import StopIcon from "@/assets/ic_stop.png";
import RestartIcon from "@/assets/btn_restart.png";
import Style from "./timer.module.scss";

export function Timer() {
  const [initialTime, setInitialTime] = useState(30 * 60);
  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(initialTime / 60));
  const [pauseToast, setPauseToast] = useState(false);
  const [finishToast, setFinishToast] = useState(false);
  const [timerStart, setTimerStart] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);
  const handleDisplayClick = () => {
    if (!isRunning) {
      setIsEditing(true);
    }
  };
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
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
    // 타이머 시간 형식
    const isMinus = secondsLeft < 0;
    const absSeconds = Math.abs(secondsLeft);
    const minutes = Math.floor(absSeconds / 60);
    const seconds = absSeconds % 60;
    const viewedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${isMinus ? "-" : ""} ${minutes}:${viewedSeconds}`;
  };
  const handleInputBlur = () => {
    // 영역에서 벗어나면 입력모드 취소
    setIsEditing(false);
    setEditValue(String(initialTime / 60));
  };

  const handleStart = () => {
    // 타이머 시작
    setIsRunning(true);
    setPauseToast(false);
    setFinishToast(false);
    setTimerStart(true);
  };
  const handlePause = () => {
    setIsRunning(false);
    setPauseToast(true);
    // 타이머 정지
  };
  const handleStop = () => {
    //집중 완료
    setIsRunning(false);
    setFinishToast(true);
    setSecondsLeft(initialTime);
    setTimerStart(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialTime);
    setPauseToast(false);
    setTimerStart(false);
    //타이머 초기화
  };
  const calPoint = 3 + parseInt(initialTime / 10);

  const isMinus = secondsLeft < 0;
  return (
    <div className={Style.wrapper}>
      <div className={Style.focus}>
        <p className={Style.timerTitle}>오늘의 집중</p>
      </div>
      <div className={Style.timer}>
        <div className={Style.stopWatch}>
            {isEditing ? (
              <input
                type="number"
                value={editValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onBlur={handleInputBlur}
                autoFocus
                className={Style.timeInput}
              />
          ) : (
            <div
              onClick={handleDisplayClick}
              className={`${Style.timeDisplay} ${isRunning ? Style.running : ""} ${isMinus ? Style.timeMinus : ""}`}
            >
              {viewedTime()}
            </div>
          )}
        </div>
        <div className={Style.buttonWrapper}>
          {timerStart && !isMinus ? ( // 동작 안하거나 집중 완료시 버튼 안보이게
            <button
              type="button"
              className={Style.pauseButton}
              onClick={handlePause}
            >
              <img src={PauseIcon} alt="일시정지" />
            </button>
          ) : (
            <div className={Style.blank}></div>
          )}

          {isMinus ? ( // 시간 초과시
            <button type="button" className={Style.button} onClick={handleStop}>
              <img src={StopIcon} alt="정지" />
              <p>Stop!</p>
            </button>
          ) : (
            <button
              type="button"
              className={Style.button}
              onClick={handleStart}
              disabled={isRunning}
            >
              <img src={PlayIcon} alt="시작" />
              <p>Play!</p>
            </button>
          )}

          {timerStart && !isMinus ? (
            <button
              type="button"
              className={Style.resetButton}
              onClick={handleReset}
            >
              <img src={RestartIcon} alt="초기화" />
            </button>
          ) : (
            <div className={Style.blank}></div>
          )}
        </div>
      </div>
      {pauseToast && (
        <div className={Style.pauseMessage}>
          <p>🚨 집중이 중단되었습니다</p>
        </div>
      )}
      {finishToast && (
        <div className={Style.finishMessage}>
          <p>🎉 {calPoint} 포인트를 획득했습니다!</p>
        </div>
      )}
    </div>
  );
}
