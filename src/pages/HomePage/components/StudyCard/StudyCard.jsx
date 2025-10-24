import React from "react";
import leafIcon from "@/assets/ic_point.png";
import styles from "./StudyCard.module.scss";

export function StudyCard({
  id,
  title,
  days,
  description,
  points,
  reactions,
  color,
  onClick,
  onReactionClick,
}) {
  return (
    <div
      className={`${styles.card} ${
        color === "green"
          ? styles.green
          : color === "yellow"
            ? styles.yellow
            : color === "blue"
              ? styles.blue
              : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <span className={styles.pointTag}>
          <img src={leafIcon} alt="leaf icon" />
          {points}P 획득
        </span>
      </div>
      <p className={styles.days}>{days}일째 진행중</p>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
      <div className={styles.reactions}>
        <button
          className={styles.reactionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(id, "study");
          }}
        >
          👩‍💻 {reactions && reactions.study ? reactions.study : 0}
        </button>
        <button
          className={styles.reactionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(id, "fire");
          }}
        >
          🔥 {reactions && reactions.fire ? reactions.fire : 0}
        </button>
        <button
          className={styles.reactionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(id, "heart");
          }}
        >
          🤍 {reactions && reactions.heart ? reactions.heart : 0}
        </button>
      </div>
    </div>
  );
}

export default StudyCard;
