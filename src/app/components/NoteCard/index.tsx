'use client';

import { useRouter } from 'next/navigation';
import style from './style.module.css';

interface note{
  title: string,
  author: string,
  upvotes: number,
  date: string,
  content: string,
  uuid: string
};

export default async function NoteCard({ title, author, upvotes, date, content, uuid } : note){
  const router = useRouter();

  return <div className={style.container}
    onClick={() => router.push(`/note/${uuid}`)}>
    <h1>{ title }</h1>
    <div className={style.info}>
      <p>{ author }</p>
      <p>{ upvotes }</p>
      <p>{ date }</p>
    </div>
    <div className={style.description}>
      {
        content
      }
    </div>
  </div>;
}