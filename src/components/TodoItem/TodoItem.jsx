import styles from './TodoItem.module.scss';
import trashImg from '../../assets/img/btn_determinate.png';

export function TodoItem({ todo, onClick, showDelete = false, onDelete }) {
  return (
    <li
      className={`${styles.todoItem} ${todo.isDone ? styles.activeBackground : ''}`}
      onClick={() => {
        if (onClick) onClick(todo.id);
      }}
    >
      <div className={styles.itemInner}>
        {todo.text}
        {showDelete && (
          <img
            src={trashImg}
            alt="삭제"
            className={styles.trashBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id)
            }} />
        )}
      </div>
    </li>
  )
}