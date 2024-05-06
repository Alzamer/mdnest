"use client";

import { useRouter, usePathname } from "next/navigation";
import * as PaginationMui from '@mui/material/Pagination';
import styles from "./style.module.css";
import { ReactNode, useState } from "react";

export default function Pagination({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [page, setPage] = useState(1);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    replace(`${pathname}?page=${value}`);
  }

  return (
    <>
      <main className={styles.container}>{children}</main>
      <div className={styles.pagination}>
      <PaginationMui.default count={count} page={page} onChange={handleChange}/>
      </div>
    </>
  );
}
