import style from './style.module.css'
import NoteCard from '../NoteCard';
import Pagination from '../Pagination';
import { createClient } from '../../../../utils/supabase/server';

const CARDS_ON_PAGE = 9;
const supabase = createClient();

export default async function Content({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }){
    const authors: any[] = [];
    let currentPage = Number(searchParams?.page) || 0;

    let { data: _, count} = await supabase
    .from('notes')
    .select('*', { count: 'exact' })

    if(count === null)
      count = 0;

    if(currentPage < 0)
      currentPage = 0;

    const NUMBER_OF_PAGES = Math.floor(count / CARDS_ON_PAGE);

    if(currentPage > NUMBER_OF_PAGES)
      currentPage = NUMBER_OF_PAGES;

    const { data, error } = await supabase
    .from('notes')
    .select()
    .range((currentPage * CARDS_ON_PAGE), (currentPage * CARDS_ON_PAGE) + CARDS_ON_PAGE - 1);

    if(error)
      throw error;

    for(let i of data){
      const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .match({
        id: i.author
      });

      if(error)
        throw error;

      authors.push(data[0].username);
    }

    return <div className={style.container}>
      <Pagination count={NUMBER_OF_PAGES}>
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
      </Pagination>
    </div>;
}