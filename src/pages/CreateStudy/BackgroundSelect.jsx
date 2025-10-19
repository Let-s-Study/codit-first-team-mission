import styles from './BackgroundSelect.module.scss'

export function BackgroundSelect(props){
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
                onClick={() => { handleSelect(it.id); }}
                title={it.label ||  it.id}
                >
                <span className={styles.bg} style={bgStyle} aria-hidden="true" />
                </button>
            );

            })}
        </div>
        </div>
    )
}
