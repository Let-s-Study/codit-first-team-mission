import styles from './BackgroundSelect.module.scss'
import selectedBg from '@/assets/ic_bg_selected.png'

export function BackgroundSelect(props){
    console.log(props);
    const items   = Array.isArray(props.items) ? props.items : [];
    const selectedId = typeof props.value === "string" ? props.value : "";
    const onChange = props.onChange;

    function handleSelect(id) {
        if (typeof onChange === "function"){
            onChange(id);
        }
    }
        return (
        <div className={styles.wrap}>
        <div className={styles.grid}>
            {items.map(function (it) {
            const isSelected = selectedId === it.id;
            const bgStyle =
            it.type === "color"
                ? { backgroundColor: it.value }
                : { backgroundImage: `url(${it.value})` };
            const className = 
            `${styles.tile}${isSelected 
                ? " " 
                + styles.selected 
                : ""}`;

            return (
                <button
                key={it.id}
                type="button"
                className={className}
                onClick={() => {handleSelect(it.id); }}
                style={bgStyle} 
                > 
                {isSelected &&
                <img src={selectedBg} className={selectedBg} />}
                </button>
            );
            })}
        </div>
        </div>
    )
}
