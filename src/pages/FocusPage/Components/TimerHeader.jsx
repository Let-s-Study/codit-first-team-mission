import Style from "./timerHeader.module.scss";
import { TodayButtons } from "@/components/Buttons/TodayButtons/TodayButtons";
import { EarnedPoints } from "@/components/Points/EarnedPoints";

export function TimerHeader({ study }) {
  const studyTitle = study?.title || "내 스터디";
  const totalPoint = study?.totalPoint || 0;

  return (
    <div className={Style.wrapper}>
      <div className={Style.studyBox}>
        <p className={Style.studyTitle}>{studyTitle}</p>
        <TodayButtons value="focus" />
      </div>
      <EarnedPoints points={totalPoint} />
    </div>
  );
}
