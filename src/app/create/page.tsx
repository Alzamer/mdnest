'use client';

import style from './style.module.css';
import { useState } from 'react';
import { Input, Button } from 'semantic-ui-react'
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient();

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const addNote = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('notes')
      .insert({
        title: title,
        author: user!?.id,
        content: content
      });

    if (error)
      throw error;
    
    router.push(`/`);
  };

  const handleSubmit = () => {
    if (title === "" || content === "")
      return;

    addNote();
  };

  const notify = () => toast("Wow so easy!");

  return <div className={style.container}>
    <div className={style.profile} data-color-mode="light">
      <h1>
        <Input placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </h1>
      <h1>
        <MDEditor
          value={content}
          onChange={setContent as () => void}
          height={600}
          minHeight={600}
          maxHeight={600}
        />
      </h1>
      <Button primary onClick={handleSubmit}>
        Add note
      </Button>
      <ToastContainer/>
    </div>
  </div>;
}