'use client';
import { useState } from "react";
import Filter from '../../components/Filter';
import styles from "./style.module.css";

export default function MainPageWrapper({ children } : { children: any}) {
  const [sortByUpvotesAsc, setSortByUpvotesAsc] = useState(true);
  const [sortByDatesNewest, setSortByDatesNewest] = useState(true);
  const [sortByAuthorAlphabetically, setSortByAuthorAlphabetically] = useState(false);

  return (
    <main className={styles.container}>
      <Filter upvotes={{sortByUpvotesAsc, setSortByUpvotesAsc}} 
        dates={{sortByDatesNewest, setSortByDatesNewest}} 
        authors={{sortByAuthorAlphabetically, setSortByAuthorAlphabetically}}
      />
      {
        children
      }
    </main>
  );
}