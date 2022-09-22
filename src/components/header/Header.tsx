import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles["header"]}>
      <img
        className={styles["logo"]}
        src="/assets/graviti-logo.svg"
        alt="graviti-logo"
      />
    </header>
  );
}
