import React from "react";
import styles from "./EarnedPoints.module.scss";
import PointIcon from "@/assets/ic_point.png";

function formatPoints(n) {
  const v = typeof n === "number" && isFinite(n) ? n : 0;
  return v.toLocaleString();
}

export function EarnedPoints({
  points = 0,
  label = "현재까지 획득한 포인트",
  className = "",
}) {
  return (
    <div className={`${styles.pointSection} ${className}`}>
      <p className={styles.currentPoints}>{label}</p>
      <div className={styles.pointBox}>
        <img src={PointIcon} alt="point" />
        <p>{formatPoints(points)}P 획득</p>
      </div>
    </div>
  );
}

export default EarnedPoints;
