import { React, useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { Panel } from '@/components/Panel/Panel'
import { HabitDetail } from '@/pages/HabitPage/HabitDetail/HabitDetail'
import { TodayButtons } from '@/components/Buttons/TodayButtons/TodayButtons'
import { Modal } from '@/components/Modal/Modal'
import { ModalContents } from '@/components/Modal/Contents/HabitModalContents'
import { EmptyState } from "@/components/EmptyState/EmptyState"
import styles from './HabitPage.module.scss'

import { getHabits, getTodayCompleted, toggleHabitRecord } from '@/api/habits';

export function HabitPage({ onDelete , habit , study}) {
  const now = new Date();
  const toTodo = (habit, completedSet) => ({
    id: habit.id,
    title: habit.title,
    studyId: habit.studyId,
    isDone: false, 
  });
  const [habits, setHabits] = useState([]); // [{id,title,studyId}, ...]
  const [isOpen, setIsOpen] = useState(false);

  const todayKey = useMemo(() => toDateKey(now), [now]);

  useEffect(() => {
    if (!study?.id) return;
    let canceled = false;

    (async () => {
      try {
        const [habitList, completedSet] = await Promise.all([
          getHabitsByStudyId(study.id),
        ]);
        if (canceled) return;
        setHabits(habitList);
      } catch (e) {
        if (!canceled) {
          console.error('[HabitPage] load error', e);
          setHabits([]);
        }
      }
    })();

    return () => { canceled = true; };
  }, [study?.id, todayKey]);

  // ⚠️ 기존 toggleClick 시그니처 유지! (onClick에서 그대로 참조하므로)
  const toggleClick = async (id) => {
    try {
      await toggleHabitRecord(id, todayKey);
    } catch (e) {
      console.error('[HabitPage] toggle error', e);
      // 실패 롤백
      setCompletedIds(new Set(completedIds));
      alert('저장 중 오류가 발생했습니다.');
    }
  };
  const toDateKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

  // ✅ ModalContents 시그니처를 유지하려면 setTodos 별칭만 제공
  const setTodos = (nextList) => {
    // nextList가 기존 todo 형태라면 id/title/studyId만 추출하여 habits로 치환
    // (className/구조에 영향 없이 데이터만 유지)
    const normalized = nextList.map(({ id, title, studyId }) => ({ id, title, studyId }));
    setHabits(normalized);
    // 완료 상태는 유지 (필요 시 교차검증 가능)
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.appContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{study.title}</h1>
          </div>
          <TodayButtons value="habit"/>
        </div>
        <div className={styles.timeContainer}>
          <h3>현재 시간</h3>
          <p>{now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
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
                    onClose={() => setIsOpen(false)} />
                </Modal>
              {habits.length === 0 ? (
                <EmptyState message="아직 습관이 없어요." />
              ) : (
                <ul className={styles.todoList}>
                  {habits.map((todo) => (
                    <HabitDetail
                      key={todo.id}
                      // ✅ isDone은 DB에 없고, 파생 계산만 주입 (className 영향 없음)
                      todo={toTodo(todo, completedIds)}
                      onClick={() => toggleClick(todo.id)}
                      onDelete={() => onDelete(todo.id)}
                    />
                  ))}
                </ul>
              )}
            </Panel>
        </section>
      </div>
    </div>
  )
}
