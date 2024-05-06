import style from "./style.module.css";
import NoteCard from "../NoteCard";
import Pagination from "../Pagination";
import { createClient } from "../../../../utils/supabase/server";

const CARDS_ON_PAGE = 9;
const supabase = createClient();

export default async function Content({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <div className={style.container}>
      <Pagination count={3}>
        {[1, 2, 3, 5, 6, 7, 8, 9, 10].map((row, index) => (
          <NoteCard
            title={"ex"}
            author={"au"}
            upvotes={1}
            downvotes={2}
            date={"date"}
            content={"content"}
            uuid={"123"}
            key={index}
          />
        ))}
      </Pagination>
    </div>
  );
}
