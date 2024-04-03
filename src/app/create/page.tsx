'use client';

import style from './style.module.css';
import { useState } from 'react';
import { Input, Button } from 'semantic-ui-react'
import MDEditor from '@uiw/react-md-editor';

export default function Page(){
  const [value, setValue] = useState("");
  return <div className={style.container}>
    <div className={style.profile} data-color-mode="light">
      <h1><Input placeholder='Title'/></h1>
      <h1>
        <MDEditor
          value={value}
          onChange={setValue}
          height={600}
          minHeight={600}
          maxHeight={600}
        />
      </h1>
      <Button primary>Add note</Button>
    </div>
  </div>;
}