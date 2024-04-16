'use client';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { createClient } from '../../../../utils/supabase/client';

const supabase = createClient();

export default function Comment({ author, comment, createdAt} : { author: string, comment: string, createdAt: string}) {
  const [commentAuthor, setCommentAuthor] = useState('');
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .match({
        id: author
      })
      setCommentAuthor(data![0].username);
    })()
  }, []);

  return <div className={styles.container}>
    <p>{ commentAuthor ? commentAuthor : <span>Loading...</span> } { createdAt.slice(0, 10) }</p>
    <p>{ comment }</p>
  </div>;
}