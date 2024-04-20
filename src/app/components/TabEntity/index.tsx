'use client';

import styles from './style.module.css';
import { useRouter } from 'next/navigation'

export default function TabEntity({ title, createdAt, content, uuid } : {
    title: string,
    createdAt: string,
    content: string,
    uuid: string
  }) {
  const router = useRouter()

  return <div className={styles.container}>
    <div className={styles.titleHeader}>
      <p onClick={() => router.push(`note/${uuid}`)}>
        <u>
          { title }
        </u>
      </p>
      <p>{ createdAt.slice(0, 10) }</p>
    </div>
    <p>{ content.slice(0, 190) }...</p>
  </div>
};