import styles from "./page.module.css";
import Content from './components/Content';
import Filter from './components/Filter';

export default function Home() {
  return (
    <main className={styles.container}>
      <Filter/>
      <Content/>
    </main>
  );
}