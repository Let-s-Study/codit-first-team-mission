import styles from "./EmptyState.module.scss";

export function EmptyState({ message }) {
  return (
    <div className={styles.empty}>
      <p>{message}</p>
    </div>
  );
}


