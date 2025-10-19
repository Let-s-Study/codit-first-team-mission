import './TodoItem.scss';

import trashImg from '../../assets/img/btn_determinate.png';

export function TodoItem({ todo, onClick, showDelete = false, onDelete }) {
  const todoItem = "todo-item"
  const activeBackground = "active-background"
  return (
    <li
      className={`${todoItem} ${todo.isDone ? activeBackground : ''}`}
      onClick={() => {
        if (onClick) onClick(todo.id);
      }}
      onDoubleClick={() => {
        if (onDoubleClick) onDoubleClick(todo);
      }}
    >
      <div className="item_inner">
        {todo.text}
        {showDelete && (
          <img
            src={trashImg}
            alt="삭제"
            className="trash_btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id)
            }} />
        )}
      </div>
    </li>
  )
}