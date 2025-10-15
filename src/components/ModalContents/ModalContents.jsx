import { React, useState, useEffect } from 'react';

import './ModalContents.scss'
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

  const handleCancel = () => {
    onClose();
  }

  const handleSave = () => {
    onSave(editTodos);
    onClose();
  }

  return (
    <div className="listSection">
      <h2>습관 목록</h2>

      {editTodos.length === 0 ? (
        <p>아직 습관이 없어요<br />목록 수정을 눌러 습관을 생성해보세요</p>
      ) : (
        <ul className="todoList">
          {editTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              showDelete={true}
              onDelete={() => handleDelete(todo.id)} />
          ))}
        </ul>
      )}
      <div className="modalBtnWrapper">
        <button className="cancelBtn" onClick={handleCancel}>취소</button>
        <button className="modifyBtn" onClick={handleSave}>수정 완료</button>
      </div>
    </div>
  )
}

export default ModalContents