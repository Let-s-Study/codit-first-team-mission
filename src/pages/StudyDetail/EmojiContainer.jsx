    import style from './EmojiContainer.module.scss';

    
    export function EmojiContainer({ emojis }) {
    const entries = Array.isArray(emojis)
        ? emojis.map((e) => [e.emoji, e.count])
        : Object.entries(emojis ?? {});

    return (
        <div className={style.container}>
        {entries.map(([emoji, count]) => (
            <div key={emoji} className={style.emojiTag}>
            {emoji} {count > 0 && <sup>{count}</sup>}
            </div>
        ))}
        </div>
    );
    }
