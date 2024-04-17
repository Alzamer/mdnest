import { Suspense } from 'react';
import styles from "./page.module.css";
import Content from './components/Content';
import Filter from './components/Filter';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <main className={styles.container}>
      <Filter/>
      <Suspense fallback={<h1>Loading...</h1>}> 
        <Content searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}