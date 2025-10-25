import React from "react";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { StudyCard } from "../StudyCard/StudyCard";
import styles from "./RecentStudySection.module.scss";

export function RecentStudySection({ studies = [], onReactionUpdate }) {
  return (
    <section className={styles.recentStudy}>
      <h2>최근 조회한 스터디</h2>
      {studies.length === 0 ? (
        <EmptyState message="아직 조회한 스터디가 없습니다." />
      ) : (
        <div className={styles.cardWrap}>
          {studies.map((study) => (
            <StudyCard
              key={study.id}
              {...study}
              onReactionClick={onReactionUpdate}
            />
          ))}
        </div>
      )}
    </section>
  );
}
