import styles from '../layout.module.scss';

export default function Footer() {
  return (
    <footer className={`${styles.layoutBlock} ${styles.footer}`}>
      <div className={styles.containerImg}>
        <img src="/img/brusnika.svg" alt=""/>
      </div>
      <p className={styles.layoutText}>Команда проектного практикума “Women moment”</p>
    </footer>
  )
}
