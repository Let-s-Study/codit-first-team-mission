import { useState, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import ic_smile from "@/assets/ic_smile.svg";
import { EmojiContainer } from "./EmojiContainer";
import { EmojiContext } from "@/context/EmojiContext";
import apiClient from "@/api/client";
import styles from "./SelectEmojis.module.scss";

export function SelectEmojis({ studyId, existingEmojis = [], onSaved }) {
  const [showPicker, setShowPicker] = useState(false);
  const { emojis, addEmoji } = useContext(EmojiContext);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [saving, setSaving] = useState(false);
  const recentEmojis = emojis.slice(0, 3);

  const extractErrorMsg = (err) => {
    const code = err?.response?.status;
    const data = err?.response?.data;
    const m =
      (typeof data?.message === "string" && data.message) ||
      (typeof data?.error === "string" && data.error) ||
      err?.message ||
      "알 수 없는 오류";
    return `[${code ?? "ERR"}] ${m}`;
  };

  const saveToServer = async (emoji) => {
    if (!studyId || saving) return;
    setSaving(true);
    let success = false;

    try {
      const found = Array.isArray(existingEmojis)
        ? existingEmojis.find((e) => e.emoji === emoji)
        : null;

      if (found?.id) {
        await apiClient.patch(`/emojis/${found.id}/increment`);
        success = true;
      } else {
        const id = encodeURIComponent(studyId);
        try {
          await apiClient.post(`/studies/${id}/emojis`, { emoji });
          success = true;
        } catch (err1) {
          await apiClient.post(`/emojis`, { studyId, emoji, count: 1 });
          success = true;
        }
      }
    } catch (err) {
      console.error("emoji save failed", err);
      alert(`이모지 저장에 실패했어요.\n${extractErrorMsg(err)}`);
    } finally {
      setSaving(false);
      if (success) onSaved && onSaved(emoji);
    }
  };

  const handleEmojiClick = (data) => {
    const emoji = data?.emoji || data?.native;
    if (!emoji) return;
    setSelectedEmoji(emoji);
    addEmoji(emoji);
    setShowPicker(false);
    saveToServer(emoji);
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

      <button
        className={styles.add}
        onClick={() => !saving && setShowPicker((v) => !v)}
        disabled={saving}
        aria-busy={saving ? "true" : "false"}
      >
        <img src={ic_smile} alt="추가 버튼" /> {saving ? "저장 중…" : "추가"}
      </button>
    </div>
  );
}
