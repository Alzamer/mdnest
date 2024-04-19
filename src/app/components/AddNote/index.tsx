'use client';

import { useRouter } from 'next/navigation';
import style from './style.module.css';

export default function AddNote() {
  const router = useRouter();
  return <div className={style.container}>
    <div className={style.handler} onClick={() => router.push('/create')}>
      <b>+</b>
    </div>
  </div>;
}