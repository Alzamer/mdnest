import style from './style.module.css'
import NoteCard from '../NoteCard';
import { createClient } from '../../../../utils/supabase/server';

const supabase = createClient();

export default async function Content(){
  const { data, error } = await supabase
  .from('notes')
  .select();

  return <div className={style.container}>
    {
      data?.map(row => <NoteCard
        title={row.title}
        author={row.author}
        upvotes={row.upvotes}
        downvotes={row.downvotes}
        date={row.createdAt}
        content={row.content}
        uuid={row.id}
        key={row.id}
      />)
    }
  </div>;
}