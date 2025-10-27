import React from "react";
import leafIcon from "@/assets/ic_point.png";
import styles from "./StudyCard.module.scss";

function isHexColor(v) {
  return typeof v === "string" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
}
function isImageLike(v) {
  if (typeof v !== "string") return false;
  if (v.startsWith("http")) return true;
  if (v.startsWith("/")) return true;
  if (v.startsWith("data:")) return true;
  const lower = v.toLowerCase();
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".svg")
  );
}

export function StudyCard({
  id,
  title,
  days,
  description,
  points,
  color,
  emojis = [],
  nickname,
  onStudyClick,
  onClick,
  onReactionClick,
}) {
  let colorClass = styles.default;
  if (color === "green") colorClass = styles.green;
  else if (color === "yellow") colorClass = styles.yellow;
  else if (color === "blue") colorClass = styles.blue;

  const inlineStyle = {};
  if (isHexColor(color)) {
    inlineStyle.background = color;
  } else if (isImageLike(color)) {
    inlineStyle.backgroundImage = `url(${color})`;
    inlineStyle.backgroundSize = "cover";
    inlineStyle.backgroundPosition = "center";
  }

  const handleCardClick = () => {
    if (typeof onStudyClick === "function") {
      onStudyClick(id);
    } else if (typeof onClick === "function") {
      onClick(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className={`${styles.card} ${colorClass}`}
      style={inlineStyle}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`${nickname ? nickname + " " : ""}${title}`}
    >
      <div className={styles.cardHeader}>
        <h3>
          <strong>{nickname || ""}</strong>
          {title}
        </h3>
        <span className={styles.pointTag}>
          <img src={leafIcon} alt="point" />
          {typeof points === "number" ? points : 0}P 획득
        </span>
      </div>

      {typeof days === "number" && (
        <p className={styles.days}>{days}일째 진행중</p>
      )}

      <div className={styles.description}>
        <p>{description}</p>
      </div>

      <div className={styles.reactions}>
        {Array.isArray(emojis) &&
          emojis.length > 0 &&
          emojis.map((emojiItem) => (
            <button
              key={emojiItem.id}
              className={styles.reactionBtn}
              onClick={(e) => {
                e.stopPropagation();
                if (typeof onReactionClick === "function") {
                  onReactionClick(id, emojiItem.id);
                }
              }}
            >
              {emojiItem.emoji} {emojiItem.count}
            </button>
          ))}
      </div>
    </article>
  );
}

export default StudyCard;
