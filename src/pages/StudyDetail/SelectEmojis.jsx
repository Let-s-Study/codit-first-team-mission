import { useState, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import ic_smile from "@/assets/ic_smile.svg";
import { EmojiContainer } from "./EmojiContainer";
import { EmojiContext } from "@/context/EmojiContext";
import styles from "./SelectEmojis.module.scss";

export function SelectEmojis() {
  const [showPicker, setShowPicker] = useState(false);
  const { emojis, addEmoji } = useContext(EmojiContext);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const recentEmojis = emojis.slice(0, 3);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    setSelectedEmoji(emoji);
    addEmoji(emoji);
  };
  return (
    <div className={styles.wrap}>
      <EmojiContainer
        recentEmojis={recentEmojis}
        selectedEmoji={selectedEmoji}
      />
      {showPicker && (
        <div>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <button className={styles.add} onClick={() => setShowPicker((v) => !v)}>
        <img src={ic_smile} alt="추가 버튼" /> 추가
      </button>
    </div>
  );
}
