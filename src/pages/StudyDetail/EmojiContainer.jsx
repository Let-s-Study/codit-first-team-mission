import { useState, useContext } from "react"
import { EmojiContext } from "@/context/EmojiContext"
import style from './EmojiContainer.module.scss'
import plus from '@/assets/ic_plus.svg'

export const EmojiContainer = ({ recentEmojis }) => {
    const [showContainer, setShowContainer ] = useState(false)
    const { emojis } = useContext(EmojiContext)

    return (
        <div className={style.emojiWrapper}>
            {/* 최근 3개의 이모지 표시 */}
            <div className={style.recentEmojis}>
                {recentEmojis.map(({ emoji, count }) => (
                    <div key={emoji} className={style.emojiTag}>
                        {emoji} {count > 0 && <sup>{count}</sup>}
                    </div>
                ))}
            </div>
            <button 
                className={style.ableContainer} 
                onClick={() => setShowContainer((prev) => !prev)}
            >
                <img src={plus} alt="toggle icon" />
                {emojis.length > 0 ? - 3 : 0}
            </button>
            {showContainer && (
                <div className={style.container}>
                    {emojis.map(({ emoji, count }) => (
                        <div key={emoji} className={style.emojiTag}>
                            {emoji} {count > 0 && <sup>{count}</sup>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
