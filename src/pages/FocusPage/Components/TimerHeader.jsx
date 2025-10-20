import PointIcon from "@/assets/ic_point.png";
import Style from "./timerHeader.module.scss";
import { Link } from "react-router-dom";
export function TimerHeader() {
  return (
    <div className={Style.wrapper}>
      <div className={Style.studyBox}>
        <p className={Style.studyTitle}>
          스터디{/*api로 스터디 이름 가져오기*/}
        </p>
        <div className={Style.linkButtons}>
          <Link to="../habbit" className={Style.linkButton}>
            {" "}
            오늘의 습관 {">"}
          </Link>

          <Link to="../home" className={Style.linkButton}>
            {" "}
            홈{">"}
          </Link>
        </div>
      </div>
      <div className={Style.pointSection}>
        <p className={Style.gainPoint}>현재까지 획득한 포인트</p>
        <div className={Style.pointBox}>
          <img src={PointIcon} alt="point" />{" "}
          <p>{/* api로 포인트 가져오기 */}P 획득 </p>
        </div>
      </div>
    </div>
  );
}
