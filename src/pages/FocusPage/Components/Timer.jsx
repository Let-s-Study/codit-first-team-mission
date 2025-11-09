import { useState, useEffect, useRef } from "react";
import PauseIcon from "@/assets/btn_pause.png";
import PlayIcon from "@/assets/ic_play.png";
import StopIcon from "@/assets/ic_stop.png";
import RestartIcon from "@/assets/btn_restart.png";
import Style from "./Timer.module.scss";

export function Timer({
  initialSeconds = 30 * 60,
  autoStart = false,
  onComplete,
  rewardPoint = 50,
}) {
  const [initialTime, setInitialTime] = useState(initialSeconds);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(!!autoStart);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(String(initialSeconds / 60));
  const [editSeconds, setEditSeconds] = useState("00");
  const [pauseToast, setPauseToast] = useState(false);
  const [finishToast, setFinishToast] = useState(false);
  const [timerStart, setTimerStart] = useState(!!autoStart);
  const [finished, setFinished] = useState(false);
  const elapsedRef = useRef(0);
  const tickRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    tickRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(tickRef.current);
          setIsRunning(false);
          setFinishToast(true);
          setTimerStart(false);
          setFinished(true);
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete && onComplete(elapsedRef.current + 1);
          }
          return 0;
        }
        elapsedRef.current += 1;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [isRunning, onComplete]);

  const handleDisplayClick = () => {
    if (!isRunning && !finished) setIsEditing(true);
  };
  const handleMinuteChange = (e) => setEditMinutes(e.target.value);
  const handleSecondChange = (e) => {
    let v = parseInt(e.target.value, 10);
    if (isNaN(v) || v < 0) v = 0;
    if (v > 59) v = v % 60;
    setEditSeconds(String(v).padStart(2, "0"));
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const m = parseInt(editMinutes, 10) || 0;
      const s = parseInt(editSeconds, 10) || 0;
      const total = m * 60 + s;
      if (total > 0) {
        setInitialTime(total);
        setSecondsLeft(total);
        setIsEditing(false);
        elapsedRef.current = 0;
        setFinished(false);
        completedRef.current = false;
      }
    }
  };
  const handleInputBlur = () => {
    setIsEditing(false);
    setEditMinutes(String(Math.floor(initialTime / 60)));
    setEditSeconds(String(initialTime % 60).padStart(2, "0"));
  };

  const handleStart = () => {
    if (finished) return;
    setIsRunning(true);
    setPauseToast(false);
    setFinishToast(false);
    setTimerStart(true);
  };
  const handlePause = () => {
    setIsRunning(false);
    setPauseToast(true);
  };
  const handleStop = () => {
    // 조기 중지/완료 후 초기화
    setIsRunning(false);
    clearInterval(tickRef.current);
    setSecondsLeft(initialTime);
    setTimerStart(false);
    setPauseToast(false);
    setFinishToast(false);
    setFinished(false);
    elapsedRef.current = 0;
    completedRef.current = false;
  };
  const handleReset = () => {
    setIsRunning(false);
    clearInterval(tickRef.current);
    setSecondsLeft(initialTime);
    setPauseToast(false);
    setTimerStart(false);
    setFinished(false);
    elapsedRef.current = 0;
    completedRef.current = false;
  };

  const viewedTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={Style.wrapper}>
      <div className={Style.focus}>
        <p className={Style.timerTitle}>오늘의 집중</p>
      </div>

      <div className={Style.timer}>
        <div className={Style.stopWatch}>
          {isEditing ? (
            <div className={Style.timeEditWrapper}>
              <input
                type="number"
                value={editMinutes}
                onChange={handleMinuteChange}
                onKeyDown={handleInputKeyDown}
                className={Style.timeInput}
                autoFocus
              />
              <span className={Style.timeColon}>:</span>
              <input
                type="number"
                value={editSeconds}
                onChange={handleSecondChange}
                onKeyDown={handleInputKeyDown}
                onBlur={handleInputBlur}
                className={Style.timeInput}
              />
            </div>
          ) : (
            <div
              onClick={handleDisplayClick}
              className={`${Style.timeDisplay} ${isRunning ? Style.running : ""} ${finished ? Style.timeMinus : ""}`}
            >
              {viewedTime()}
            </div>
          )}
        </div>

        <div className={Style.buttonWrapper}>
          {timerStart && !finished ? (
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

          {finished ? (
            <button type="button" className={Style.button} onClick={handleStop}>
              <img src={StopIcon} alt="정지" />
              <p>Stop!</p>
            </button>
          ) : (
            <button
              type="button"
              className={Style.startButton}
              onClick={handleStart}
              disabled={isRunning}
            >
              <img src={PlayIcon} alt="시작" />
              <p>Play!</p>
            </button>
          )}

          {timerStart && !finished ? (
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
          <p>🎉 집중 완료! {rewardPoint}P 지급</p>
        </div>
      )}
    </div>
  );
}

export default Timer;
