import { React, useState } from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

import './App.scss'

import logoImg from './assets/img/img_logo.png';
import arrowRight from './assets/img/ic_arrow_right.png'


import { Panel } from './components/Panel/Panel'
import { TodoItem } from './components/TodoItem/TodoItem'
import { Header } from './components/Header/Header'


function App() {
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
    <div className="mainContainer">
      <Header />
      <div className="appContainer">
        <div className="headerContainer">
          <div className="titleContainer">
            <h1 className="title">{title}</h1>
          </div>
          <div className="menuContainer">
            <button>
              오늘의 집중
              <img src={arrowRight} className="arrowIcon"></img>
            </button>
            <button>
              홈
              <img src={arrowRight} className="arrowIcon"></img>
            </button>
          </div>
        </div>
        <div className="timeContainer">
          <h3>현재 시간</h3>
          <p>{now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>


        <section className="listSection">
          <Panel>
            <div className="listTitleSection">
              <h2>오늘의 습관</h2>
              <button onClick={() => setIsOpen(true)}>목록 수정</button>

            </div>
            {todos.length === 0 ? (
              <p>아직 습관이 없어요<br />목록 수정을 눌러 습관을 생성해보세요</p>
            ) : (

              <ul className="todoList">
                {todos.map((todo) => (
                  <TodoItem
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

export default App
