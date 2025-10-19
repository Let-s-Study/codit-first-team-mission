import React from "react";
import leafIcon from "../../assets/leaf_logo.svg";
import styles from "./StudyCard.module.scss";

function StudyCard({
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
      className={styles.card}
      style={{ backgroundColor: color }}
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
          👩‍💻 {reactions?.study}
        </button>
        <button
          className={styles.reactionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(id, "fire");
          }}
        >
          🔥 {reactions?.fire}
        </button>
        <button
          className={styles.reactionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(id, "heart");
          }}
        >
          🤍 {reactions?.heart}
        </button>
      </div>
    </div>
  );
}

export default StudyCard;
