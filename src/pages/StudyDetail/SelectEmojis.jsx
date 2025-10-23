// ✅ SelectEmojis.jsx
import React, { useState, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import addBtn from "@/assets/btn_add.svg";
import { EmojiContainer } from "./EmojiContainer";
import { EmojiContext } from "../../context/EmojiContext";
    export function SelectEmojis() {
    const [showPicker, setShowPicker] = useState(false);
    const { emojis, addEmoji } = useContext(EmojiContext); // Context 접근

    return (
        <div>
        <button onClick={() => setShowPicker((v) => !v)}>
            <img src={addBtn} alt="추가 버튼" />
        </button>

        {showPicker && (
            <div>
            <EmojiPicker onEmojiClick={(e) => addEmoji(e.emoji)} />
            </div>
        )}
        <EmojiContainer emojis={emojis} />
        </div>
    );
}
