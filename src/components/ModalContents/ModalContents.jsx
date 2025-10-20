import { React, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import styles from './ModalContents.module.scss'
import frameimg from '../../assets/img/img_frame.png'
import { TodoItem } from '../TodoItem/TodoItem';

function ModalContents({ todos, onSave, onClose }) {

  const [editTodos, setEditTodos] = useState(todos);

  useEffect(() => {
    setEditTodos(todos)
  }, [todos]);

  const handleDelete = (id) => {
    setEditTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const handleAdd = (text) => {
    const newTodo = {
      id: nanoid(),
      text: text,
      isDone: false
    };
    setEditTodos(prevTodos => [...prevTodos, newTodo]);
  }

  const handleCancel = () => {
    onClose();
  }

  const handleSave = () => {
    onSave(editTodos);
    onClose();
  }

  // edit 기능 구현

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (todo) => {
    setEditId(todo.id);
    setEditValue(todo.text);
  }

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  }

  const handleEditSave = () => {
    setEditTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === editId ? { ...t, text: editValue } : t)
    )
    setEditId(null);
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  }

  return (
    <div className={styles.listSection}>
      <h2>습관 목록</h2>

      {editTodos.length === 0 ? (
        <p>아직 습관이 없어요<br />목록 수정을 눌러 습관을 생성해보세요</p>
      ) : (
        <ul className={styles.underlineList}>
          {editTodos.map((todo) =>
            editId === todo.id ? (
              <li key={todo.id}>
                <input
                  className={styles.inputBtn}
                  value={editValue}
                  onChange={handleEditChange}
                  onBlur={handleEditSave}
                  onKeyDown={handleInputKeyDown}
                  autoFocus />
              </li>
            ) : (
              <TodoItem
                key={todo.id}
                todo={todo}
                showDelete={true}
                onDelete={() => handleDelete(todo.id)}
                onClick={() => handleEditStart(todo)} />
            ))}

        </ul>
      )}
      <div className={styles.frameBtnWrapper}>
        <button src={frameimg} className={styles.frameBtn} onClick={() => handleAdd('')}>+ </button>
      </div>
      <div className={styles.modalBtnWrapper}>
        <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
        <button className={styles.modifyBtn} onClick={handleSave}>수정 완료</button>
      </div>
    </div>
  )
}


export default ModalContents