import { useState, useEffect, useMemo } from "react";
import { Panel } from "@/components/Panel/Panel";
import { HabitDetail } from "@/pages/HabitPage/HabitDetail/HabitDetail";
import { TodayButtons } from "@/components/Buttons/TodayButtons/TodayButtons";
import { Modal } from "@/components/Modal/Modal";
import { ModalContents } from "@/components/Modal/Contents/HabitModalContents";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import styles from "./HabitPage.module.scss";

import { getHabits, getTodayCompleted, toggleHabitRecord } from "@/api/habits";

export function HabitPage({ onDelete, habit, study }) {
  const now = new Date();

  const toDateKey = (d = new Date()) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const todayKey = useMemo(() => toDateKey(now), [now]);

  const [habits, setHabits] = useState([]);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const toTodo = (h) => ({
    id: h.id,
    title: h.title,
    studyId: h.studyId,
    isDone: completedIds.has(h.id),
  });

  useEffect(() => {
    if (!study?.id) return;
    let canceled = false;

    (async () => {
      try {
        const [habitList, completedList] = await Promise.all([
          getHabits(study.id),
          getTodayCompleted(study.id, todayKey),
        ]);
        if (canceled) return;

        setHabits(habitList ?? []);
        const ids = new Set(
          (completedList ?? []).map((r) => r.habitId ?? r.id)
        );
        setCompletedIds(ids);
      } catch (e) {
        if (!canceled) {
          console.error("[HabitPage] load error", e);
          setHabits([]);
          setCompletedIds(new Set());
        }
      }
    })();

    return () => {
      canceled = true;
    };
  }, [study?.id, todayKey]);

  const toggleClick = async (id) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    try {
      await toggleHabitRecord(id, todayKey);
    } catch (e) {
      console.error("[HabitPage] toggle error", e);

      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const setTodos = (nextList = []) => {
    const normalized = nextList.map(({ id, title, studyId }) => ({
      id,
      title,
      studyId,
    }));
    setHabits(normalized);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.appContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{study.title}</h1>
          </div>
          <TodayButtons value="habit" />
        </div>
        <div className={styles.timeContainer}>
          <h3>현재 시간</h3>
          <p>
            {now.toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <section className={styles.listSection}>
          <Panel>
            <div className={styles.listNav}>
              <h2>오늘의 습관</h2>
              <button onClick={() => setIsOpen(true)}>목록 수정</button>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ModalContents
                habits={habits}
                onSave={setTodos}
                onClose={() => setIsOpen(false)}
              />
            </Modal>

            {habits.length === 0 ? (
              <EmptyState message="아직 습관이 없어요." />
            ) : (
              <ul className={styles.todoList}>
                {habits.map((h) => (
                  <HabitDetail
                    key={h.id}
                    todo={toTodo(h)}
                    onClick={() => toggleClick(h.id)}
                    onDelete={() => onDelete?.(h.id)}
                  />
                ))}
              </ul>
            )}
          </Panel>
        </section>
      </div>
    </div>
  );
}
