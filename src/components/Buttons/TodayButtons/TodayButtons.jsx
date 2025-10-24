import styles from './TodayButtons.module.scss';
import arrowRight from '@/assets/img/ic_arrow_right.png'

export function TodayButtons({ value }) {
    const buttonConfig = {
        detail: [
        <button key="detail">
            오늘의 습관
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>,
        <button key="detail2">
            오늘의 집중
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>
        ],
        focus: [
        <button key="focus1">
            오늘의 습관
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>,
        <button key="focus2">
            홈
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>
        ],
        habit: [
        <button key="habit">
            오늘의 습관
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>,
        <button key="habit2">
            오늘의 집중
            <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
        </button>
        ],
    };

    const currentButtons = buttonConfig[value]

    return <div className={styles.menuContainer}>{currentButtons}</div>;
}


