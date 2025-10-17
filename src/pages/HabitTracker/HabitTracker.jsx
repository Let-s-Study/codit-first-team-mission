import style from './HabitTracker.module.scss';

export function HabitTracker({ habits,records,onToggle }){

    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return (
    <table className={style.wrap}>
            <thead className={style.dayList}>
            <tr>
                <th/>
                {days.map((d) => (
                <th key={d} className={style.day}>{d}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {habits.map((h) => (
                <tr key={h.id}>
                <th className={style.habit}>{h.name}</th>
                {days.map((_, dIdx) => {
                    const active = records[h.id]?.[dIdx]; // true/false 여부
                    return (
                    <td key={dIdx} className={style.cell}>
                        <button
                            type="button"
                            onClick={() => onToggle(h.id, dIdx)}
                            className={`${style.toggle} ${active ? style.active : ""}`}
                            aria-pressed={active}
                        >
                        </button>
                    </td>
                    );
                })}
                </tr>
            ))}
            </tbody>
        </table>
        )
}