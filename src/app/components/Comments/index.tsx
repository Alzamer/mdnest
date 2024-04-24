'use client';

import { Input, Button } from 'semantic-ui-react'
import style from './style.module.css'
import { ReactElement, useEffect, useState } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import Comment from '../Comment';
import { ToastContainer, toast } from 'react-toastify';
import { Database } from '@/app/types/supabase';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient();

export default function Comments({ children, id, uuid }: { children: ReactElement, id: string, uuid: string }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Database['public']['Tables']['comments']['Row'][]>([]);

  const notify = (msg: string) => toast(msg);

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

      notify('You\'ve just added a comment!');
    })()
  };

  const handleThumbs = async (upvote: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('profiles')
      .select('upvoted, downvoted')
      .match({
        id: user!.id
      });

    if (error)
      throw error;

    if (data[0].upvoted?.includes(uuid) || data[0].downvoted?.includes(uuid))
      return;

    const updatedDownvotedColumn = {
      downvoted: data[0].downvoted !== null ? [...data[0].downvoted, uuid] : [uuid],
    };

    const updatedUpvotedColumn = {
      upvoted: data[0].upvoted !== null ? [...data[0].upvoted, uuid] : [uuid],
    };

    const updatedColumn = upvote ? updatedUpvotedColumn : updatedDownvotedColumn;

    const { error: anotherError } = await supabase
      .from('profiles')
      .update(
        updatedColumn
      )
      .match({
        id: user!.id
      });

    if(anotherError)
      throw anotherError;

    if(upvote)
      notify('You\'ve just upvoted a note!');
    else
      notify('You\'ve just downvoted a note!');
  };

  return <div className={style.container}>
    <div className={style.contentContainer}>
      <div className={style.thumbs}>
        <span onClick={() => handleThumbs(true)}>👍</span>
        <span onClick={() => handleThumbs(false)}>👎</span>
      </div>
      <div className={style.content}>
        {
          children
        }
      </div>
    </div>
    <div className={style.comments}>
      <div className={style.input}>
        <Input size='massive' placeholder='Add comment' value={commentText} onChange={e => setCommentText(e.target.value)} />
        <Button onClick={() => insertComment()}>Add comment</Button>
      </div>
      <div>
        {
          comments ? comments.map(row => <Comment author={row.author}
            comment={row.comment}
            createdAt={row.createdAt}
          />) : <p>Loading...</p>
        }
      </div>
    </div>
    <ToastContainer />
  </div>;
}