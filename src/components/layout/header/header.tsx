import styles from '../layout.module.scss';

export default function Header() {
  return (
    <header className={styles.layoutBlock}>
      <div className={styles.containerImg}>
        <img src="/img/logo.svg" alt=""/>
      </div>
    </header>
  )
}
