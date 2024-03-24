import style from './style.module.css'
import NoteCard from '../NoteCard';

export default function Content(){
  return <div className={style.container}>
    <NoteCard/>
  </div>;
}