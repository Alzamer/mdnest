'use client';

import style from './style.module.css';
import { navigate } from '../../../../utils/actions';

export default function AddNote(){
  return <div className={style.container}>
    <div className={style.handler} onClick={() => navigate('/create')}>
      <b>+</b>
    </div>
  </div>;
}