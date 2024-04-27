import styles from "./style.module.css";
import Comments from "@/app/components/Comments";
import NoteWrapper from "@/app/components/NoteWrapper";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      <Comments id={params.id} uuid={params.id}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <NoteWrapper uuid={params.id} />
        </Suspense>
      </Comments>
    </div>
  );
}
