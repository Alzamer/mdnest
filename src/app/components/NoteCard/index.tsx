'use client';

import { useRouter } from 'next/navigation';
import style from './style.module.css';

interface note{
  title: string,
  author: string,
  upvotes: number,
  downvotes: number,
  date: string,
  content: string,
  uuid: string
};

export default async function NoteCard({ title, author, upvotes, downvotes, date, content, uuid } : note){
  const router = useRouter();

  return <div className={style.container}
    onClick={() => router.push(`/note/${uuid}`)}>
    <h1>{ title }</h1>
    <div className={style.info}>
      <p>Author</p>
      <p>👍 { upvotes - downvotes }</p>
      <p>{ date.slice(0, 10) }</p>
    </div>
    <div className={style.description}>
      {
        content.slice(0, 60)
      }
      ...
    </div>
  </div>;
}