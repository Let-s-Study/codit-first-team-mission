import { React, useState } from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { Panel } from '@/components/Panel/Panel'
import { HabitDetail } from '@/pages/HabitPage/HabitDetail/HabitDetail'
import { TodayButtons } from '@/components/Buttons/TodayButtons/TodayButtons'
import { Modal } from '@/components/Modal/Modal'
import { ModalContents } from '@/components/Modal/Contents/HabitModalContents'
import { EmptyState } from "@/components/EmptyState/EmptyState"
import styles from './HabitPage.module.scss'

export function HabitPage({ onDelete }) {
  const now = new Date();
  const title = "연우의 개발 공장";

  const [todos, setTodos] = useState([
    { id: nanoid(), text: '미라클모닝 6시 기상', isDone: true },
    { id: nanoid(), text: '아침 챙겨 먹기', isDone: true },
    { id: nanoid(), text: 'React 스터디 책 1챕터 읽기', isDone: false },
    { id: nanoid(), text: '스트레칭', isDone: false },
    { id: nanoid(), text: '영양제 챙겨 먹기', isDone: false },
    { id: nanoid(), text: '사이드 프로젝트', isDone: false },
    { id: nanoid(), text: '물 2L 먹기', isDone: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.appContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>
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
                    todos={todos}
                    onSave={setTodos}
                    onClose={() => setIsOpen(false)} />
                </Modal>
              {todos.length === 0 ? (
                <EmptyState message="아직 습관이 없어요." />
              ) : (
                <ul className={styles.todoList}>
                  {todos.map((todo) => (
                    <HabitDetail
                      key={todo.id}
                      todo={todo}
                      onClick={toggleClick}
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