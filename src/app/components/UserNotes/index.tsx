import style from './style.module.css'
import { createClient } from '../../../../utils/supabase/server';

const supabase = createClient();

export default async function UserNotes(){
  return <div className={style.container}>
    DUPA  
  </div>
}