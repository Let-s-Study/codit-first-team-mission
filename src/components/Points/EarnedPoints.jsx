import styles from './EarnedPoints.module.scss'
import PointIcon from "@/assets/ic_point.png";

export function EarnedPoints(){
    return (
            <div className={styles.pointSection}>
                <p className={styles.currentPoints}>현재까지 획득한 포인트</p>
                <div className={styles.pointBox}>
                <img src={PointIcon} alt="point" />{" "}
                <p>360P 획득 </p>
                </div>
            </div>
    )
}