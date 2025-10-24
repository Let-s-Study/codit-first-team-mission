import React from "react";
import leafIcon from "@/assets/ic_point.png";
import styles from "./StudyCard.module.scss";

export function StudyCard({
  id,
  title,
  days,
  description,
  points,
  color,
  emojis = [],
  onClick,
  onReactionClick,
  nickname,
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
              : styles.default
      }`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <h3>
          <strong>{nickname}</strong>
          {title}
        </h3>
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
        {emojis.length > 0 &&
          emojis.map((emojiItem) => (
            <button
              key={emojiItem.id}
              className={styles.reactionBtn}
              onClick={(e) => {
                e.stopPropagation();
                onReactionClick(id, emojiItem.id);
              }}
            >
              {emojiItem.emoji} {emojiItem.count}
            </button>
          ))}
      </div>
    </div>
  );
}

export default StudyCard;
