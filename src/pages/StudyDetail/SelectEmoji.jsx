import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import addBtn from "@/assets/btn_add.svg";

export function SelectEmojis() {
    const [selectedEmoji, setSelectedEmoji] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    return (
        <div>
            <button onClick={() => (setShowPicker(!showPicker))}>
                <img src={addBtn} alt="추가 버튼" />
            </button>
        {showPicker && <div>
            <EmojiPicker
            onEmojiClick={
                (emojiData) => 
                (setSelectedEmoji((prevState) => [...prevState, emojiData.emoji]))}
            />
                </div>}
            {selectedEmoji &&
            <div>{selectedEmoji.join("")}</div>
            }
        </div>
    );
}

