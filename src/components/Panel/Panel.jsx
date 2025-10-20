import styles from './Panel.module.scss'

export function Panel({ children }) {
  return <section className={styles.panel}>{children}</section>
}