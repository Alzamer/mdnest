import { Suspense } from 'react';
import styles from "./page.module.css";
import Content from './components/Content';
import MainPageWrapper from './components/MainPageWrapper';

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
      <MainPageWrapper>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Content searchParams={searchParams} />
        </Suspense>
      </MainPageWrapper>
    </main>
  );
}