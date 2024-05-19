import styles from "./style.module.css";
import Comments from "@/app/components/Comments";
import NoteWrapper from "@/app/components/NoteWrapper";
import TailSpinWrapper from "@/app/components/TailSpinWrapper";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      <Comments uuid={params.id}>
        <Suspense fallback={<TailSpinWrapper />}>
          <NoteWrapper uuid={params.id} />
        </Suspense>
      </Comments>
    </div>
  );
}
