'use client';

import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { IoPencil } from 'react-icons/io5';
import { IoTrashBin } from 'react-icons/io5';

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
      <div className={styles.right}>
        <p>
          <IoPencil onClick={() => console.log('EDIT')}/>
        </p>
        <p>
          <IoTrashBin onClick={() => console.log('DELETE')}/>
        </p>
        <p>{ createdAt.slice(0, 10) }</p>
      </div>
    </div>
    <p>{ content.slice(0, 190) }...</p>
  </div>
};