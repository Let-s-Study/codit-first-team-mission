import styles from "./EmptyState.module.scss";

function EmptyState({ message }) {
  return (
    <div className={styles.empty}>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
