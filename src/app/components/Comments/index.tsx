'use client';

import { Input, Button } from 'semantic-ui-react'
import style from './style.module.css'
import { ReactElement, useEffect, useState } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import Comment from '../Comment';
import { Database } from '@/app/types/supabase';

const supabase = createClient();

export default function Comments({ children, id }: { children: ReactElement, id: string }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Database['public']['Tables']['comments']['Row'][]>([]);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('comments')
        .select()
        .match({
          note: id
        });

      if (error)
        throw error;

      setComments(data);
    })();
  });

  const insertComment = async () => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('comments')
        .insert({
          note: id,
          author: user!.id,
          comment: commentText,
        });
      setCommentText('');

      if (error)
        throw error;
    })()
  };

  return <div className={style.container}>
    <div className={style.content}>
      {
        children
      }
    </div>
    <div className={style.comments}>
      <div className={style.input}>
        <Input size='massive' placeholder='Add comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <Button onClick={() => insertComment()}>Add comment</Button>
      </div>
      <div>
        {
          comments ? comments.map((row: any) => <Comment author={row.author} comment={row.comment} createdAt={row.createdAt} />) : <p>Loading...</p>
        }
      </div>
    </div>
  </div>;
}