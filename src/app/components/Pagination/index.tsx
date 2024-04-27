"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./style.module.css";
import { ReactNode } from "react";

export default function Pagination({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (change: number) => {
    let search = Number(searchParams.get("page"));

    if (change === -1 && search === 0) return;

    if (change === 1 && search === count) return;

    replace(`${pathname}?page=${Number(search) + change}`);
  };

  return (
    <>
      <main className={styles.container}>{children}</main>
      <div className={styles.pagination}>
        <span style={{ fontSize: "32px" }} onClick={() => handleClick(-1)}>
          <FaAngleLeft />
        </span>
        <span style={{ fontSize: "32px" }} onClick={() => handleClick(1)}>
          <FaAngleRight />
        </span>
      </div>
    </>
  );
}
