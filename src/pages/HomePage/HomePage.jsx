import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecentStudySection } from "./components/RecentStudy/RecentStudySection";
import { StudyListSection } from "./components/StudyList/StudyListSection";
import styles from "./HomePage.module.scss";
import apiClient from "@/api/client";

const RECENT_LIMIT = 3;
const RECENT_KEY = "recentStudies_session";

export function HomePage() {
  const [studies, setStudies] = useState([]);
  const [recentIds, setRecentIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    const isReload =
      (nav && nav.type === "reload") ||
      (performance?.navigation && performance.navigation.type === 1);
    if (isReload) {
      try {
        sessionStorage.removeItem(RECENT_KEY);
      } catch {}
      setRecentIds([]);
    }
  }, []);

  const loadRecentIds = () => {
    try {
      const raw = sessionStorage.getItem(RECENT_KEY) || "[]";
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) setRecentIds(arr.slice(0, RECENT_LIMIT));
    } catch {
      setRecentIds([]);
    }
  };

  useEffect(() => {
    async function fetchStudies() {
      try {
        const res = await apiClient.get("/studies");
        const body = res?.data ?? null;

        let list = null;
        if (body && Array.isArray(body.data)) list = body.data;
        else if (Array.isArray(body)) list = body;

        if (!Array.isArray(list)) {
          setStudies([]);
          return;
        }

        const mapped = list.map((s) => {
          const nicknameValue = s?.nickName
            ? s.nickName
            : s?.nickname
              ? s.nickname
              : "";
          const createdAtValue = s?.createdAt || new Date().toISOString();
          const emojis = Array.isArray(s?.emojis)
            ? s.emojis.map((e) => ({
                id: e.id,
                emoji: e.emoji,
                count: e.count,
              }))
            : [];
          const dayMs = 1000 * 60 * 60 * 24;
          const daysPassed = Math.floor(
            (Date.now() - new Date(createdAtValue)) / dayMs
          );

          return {
            id: s.id,
            nickName: nicknameValue,
            title: s.title,
            description: s.description,
            createdAt: createdAtValue,
            points: typeof s?.totalPoint === "number" ? s.totalPoint : 0,
            color: s.background,
            days: daysPassed,
            emojis,
          };
        });

        setStudies(mapped);
      } catch (error) {
        console.error("스터디 불러오기 실패:", error);
        setStudies([]);
      }
    }

    fetchStudies();
    loadRecentIds();
  }, []);

  const pushRecent = (id) => {
    setRecentIds((prev) =>
      [id, ...prev.filter((v) => v !== id)].slice(0, RECENT_LIMIT)
    );
    try {
      const raw = sessionStorage.getItem(RECENT_KEY) || "[]";
      const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
      const next = [id, ...arr.filter((v) => v !== id)].slice(0, RECENT_LIMIT);
      sessionStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  };

  function handleStudySelectSilent(payload) {
    const id = typeof payload === "string" ? payload : payload?.id;
    if (!id) return;
    pushRecent(id);
  }

  function handleStudySelectNavigate(payload) {
    const id = typeof payload === "string" ? payload : payload?.id;
    if (!id) return;
    pushRecent(id);
    navigate(`/study/${id}/detail`);
  }

  const recentStudies = recentIds
    .map((id) => studies.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className={styles.homeWrap}>
      <section className={styles.homeSection}>
        <RecentStudySection
          studies={recentStudies}
          onStudyClick={handleStudySelectNavigate}
          onReactionUpdate={() => {}}
        />
      </section>
      <section className={styles.homeSection}>
        <StudyListSection
          studies={studies}
          onStudyClick={handleStudySelectSilent}
          onReactionUpdate={async (studyId, emojiId) => {
            try {
              await apiClient.patch(`/emojis/${emojiId}/increment`);
              setStudies((prev) =>
                prev.map((study) => {
                  if (study.id !== studyId) return study;
                  const nextEmojis = study.emojis.map((emoji) =>
                    emoji.id === emojiId
                      ? {
                          id: emoji.id,
                          emoji: emoji.emoji,
                          count: emoji.count + 1,
                        }
                      : emoji
                  );
                  return { ...study, emojis: nextEmojis };
                })
              );
            } catch (error) {
              console.error("이모지 업데이트 실패:", error);
            }
          }}
        />
      </section>
    </div>
  );
}

export default HomePage;
