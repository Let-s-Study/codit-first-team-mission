import { useState, createContext } from "react";

export const EmojiContext = createContext();

export function EmojiProvider({ children }) {
    const [emojis, setEmojis] = useState([]); // { "😀": 2, "🔥": 1 }

    const addEmoji = (emoji) => {
        setEmojis((prev) => {
        const found = prev.find((e) => e.emoji === emoji);
        if (found) {
            // 이미 존재하면 count 증가
            return prev.map((e) =>
            e.emoji === emoji ? { ...e, count: e.count + 1 } : e
            );
        }
        // 새로 추가
        return [...prev, { emoji, count: 1 }];
        });
    };

    return (
        <EmojiContext.Provider value={{ emojis, addEmoji }}>
        {children}
        </EmojiContext.Provider>
    );
    }