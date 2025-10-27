import Style from "./TimerHeader.module.scss";
import { TodayButtons } from "@/components/Buttons/TodayButtons/TodayButtons";
import { EarnedPoints } from "@/components/Points/EarnedPoints";

export function TimerHeader() {
  return (
    <div className={Style.wrapper}>
      <div className={Style.studyBox}>
        <p className={Style.studyTitle}>스터디</p>
        <TodayButtons value="focus" />
      </div>
      <EarnedPoints />
    </div>
  );
}
