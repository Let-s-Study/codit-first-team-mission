import { useState, useEffect } from "react";
import { RecentStudySection } from "./components/RecentStudy/RecentStudySection";
import { StudyListSection } from "./components/StudyList/StudyListSection";
import styles from "./HomePage.module.scss";
import apiClient from "@/api/client";

const RECENT_LIMIT = 3;

export function HomePage() {
  const [studies, setStudies] = useState([]);
  const [recentIds, setRecentIds] = useState([]);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const res = await apiClient.get("/studies");

        const mappedStudies = res.data.data.map((s) => ({
          id: s.id,
          nickname: s.nickname,
          title: s.title,
          description: s.description,
          createdAt: s.createdAt,
          points: s.totalPoint,
          color: s.background,
          days: Math.floor(
            (Date.now() - new Date(s.createdAt)) / (1000 * 60 * 60 * 24)
          ),
          emojis: Array.isArray(s.emojis)
            ? s.emojis.map((e) => ({
                id: e.id,
                emoji: e.emoji,
                count: e.count,
              }))
            : [],
        }));

        setStudies(mappedStudies);
      } catch (error) {
        console.error("스터디 불러오기 실패!!:", error);
      }
    };

    fetchStudies();
  }, []);

  const handleStudySelect = (id) => {
    setRecentIds((prev) =>
      [id, ...prev.filter((v) => v !== id)].slice(0, RECENT_LIMIT)
    );
  };

  const handleReactionUpdate = async (studyId, emojiId) => {
    try {
      await apiClient.patch(`/emojis/${emojiId}/increment`);
      setStudies((prev) =>
        prev.map((study) =>
          study.id === studyId
            ? {
                ...study,
                emojis: study.emojis.map((emoji) =>
                  emoji.id === emojiId
                    ? { ...emoji, count: emoji.count + 1 }
                    : emoji
                ),
              }
            : study
        )
      );
    } catch (error) {
      console.error("이모지 업데이트 실패!!:", error);
    }
  };

    const recentStudies = recentIds
        .map((id) => studies.find((study) => study.id === id))
        .filter(Boolean);

  return (
    <div className={styles.homeWrap}>
      <section className={styles.homeSection}>
        <RecentStudySection
          studies={recentStudies}
          onReactionUpdate={handleReactionUpdate}
        />
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
