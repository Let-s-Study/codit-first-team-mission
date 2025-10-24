import style from './InputSection.module.scss'
export function InputSection({
    name,
    label,
    value,
    onChange,
    placeholder,
    isTextArea,
    error, // 에러 메시지를 전달받음
    }) {
    return (
        <div className={style.inputSection}>
        {label && <label htmlFor={name}>{label}</label>}
        {isTextArea ? (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            />
        ) : (
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
            />
        )}
        {error &&
        <div className={style.error}>
            {error}
            </div>}
        </div>
    );
    }