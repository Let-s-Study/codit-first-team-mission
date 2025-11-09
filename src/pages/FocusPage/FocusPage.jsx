import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TimerHeader } from "./Components/TimerHeader";
import { Timer } from "./Components/Timer";
import { awardStudyPoints } from "@/api/awardPoints";
import styles from "./FocusPage.module.scss";

const REWARD_POINT = 50;

export function FocusPage() {
  const { studyId: paramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const studyId = paramId || location.state?.studyId;

  async function handleDone() {
    if (!studyId) {
      navigate("/", { replace: true });
      return;
    }

    const res = await awardStudyPoints(studyId, REWARD_POINT);

    window.dispatchEvent(
      new CustomEvent("study:points-updated", {
        detail: {
          studyId,
          delta: REWARD_POINT,
          total: res.ok ? res.total : undefined,
        },
      })
    );

    await new Promise((r) => setTimeout(r, 1200));
    navigate(`/study/${encodeURIComponent(studyId)}/detail`, {
      replace: true,
      state: {
        awardDelta: REWARD_POINT,
        awardTotal: res.ok ? res.total : undefined,
      },
    });
  }

  return (
    <div className={styles.wrapper}>
      <TimerHeader />

      <Timer
        initialSeconds={30 * 60}
        onComplete={handleDone}
        rewardPoint={REWARD_POINT}
      />
    </div>
  );
}

export default FocusPage;
