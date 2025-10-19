import { useState } from "react";
import RecentStudySection from "./components/RecentStudy/RecentStudySection";
import StudyListSection from "./components/StudyList/StudyListSection";
import styles from "./HomePage.module.scss";
import { studyList } from "./Api/studyData.js";

const RECENT_LIMIT = 3;

export function HomePage() {
  const [studies, setStudies] = useState(studyList);
  const [recentIds, setRecentIds] = useState([]);

  const handleStudySelect = (id) => {
    setRecentIds((prev) =>
      [id, ...prev.filter((v) => v !== id)].slice(0, RECENT_LIMIT)
    );
  };

  const handleReactionUpdate = (id, type) => {
    setStudies((prev) =>
      prev.map((study) =>
        study.id === id
          ? {
              ...study,
              reactions: {
                ...study.reactions,
                [type]: study.reactions[type] + 1,
              },
            }
          : study
      )
    );
  };

  const recentStudies = recentIds
    .map((id) => studies.find((study) => study.id === id))
    .filter(Boolean);

  return (
    <div className={styles.homeWrap}>
      <section className={styles.homeSection}>
        <RecentStudySection studies={recentStudies} />
      </section>

      <section className={styles.homeSection}>
        <StudyListSection
          studies={studies}
          onStudyClick={handleStudySelect}
          onReactionUpdate={handleReactionUpdate}
        />
      </section>
    </div>
  );
}
