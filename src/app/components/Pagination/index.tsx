"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { TailSpin } from 'react-loader-spinner'
import NoteCard from "../NoteCard";
import * as PaginationMui from '@mui/material/Pagination';
import styles from "./style.module.css";
import { useState } from "react";
import useFetchNotes from '../../../../utils/hooks/useFetchNotes'

export default function Pagination({
  count,
}: {
  count: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const { replace } = useRouter();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const {
    result,
    isPending,
    isError
  } = useFetchNotes(page);

  if (isError)
    return <p>Couldn't fetch data!</p>;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    replace(`${pathname}?page=${value}`);
  };
  return (
    <div>
      <main className={styles.container}>
        {
          isPending ? <div className={styles.loading}>
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div> :
            result?.map((row, index) => <NoteCard
              title={row.title}
              author={row.author}
              upvotes={row.upvotes}
              downvotes={row.downvotes}
              date={row.createdAt}
              content={row.content}
              uuid={row.id}
              key={index}
            />)
        }
      </main>
      <div className={styles.pagination}>
        <PaginationMui.default count={count} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}