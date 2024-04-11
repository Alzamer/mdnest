import style from './style.module.css'
import NoteCard from '../NoteCard';

import { createClient } from '../../../../utils/supabase/server';

const supabase = createClient();

export default async function Content(){
  const { data, error } = await supabase
  .from('notes')
  .select();

  return <div className={style.container}>
    <ul>
    {
      data?.map(row => <NoteCard/>)
    }
    </ul>
  </div>;
}