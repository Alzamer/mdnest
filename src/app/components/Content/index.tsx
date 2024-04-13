import style from './style.module.css'
import NoteCard from '../NoteCard';
import { createClient } from '../../../../utils/supabase/server';

const supabase = createClient();

export default async function Content(){
  const authors: any[] = [];
  const { data, error } = await supabase
  .from('notes')
  .select();

  for(let i of data!){
    const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .match({
      id: i.author
    });

    authors.push(data![0].username);
  }

  return <div className={style.container}>
    {
      data?.map((row, index) => <NoteCard
        title={row.title}
        author={authors[index]}
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