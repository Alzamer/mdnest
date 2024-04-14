'use client';
import { Input, Button } from 'semantic-ui-react'
import style from './style.module.css'

export default async function Comments(){
  return <div className={style.container}>
    <div className={style.comments}>
      <div className={style.input}>
      <Input size='massive' placeholder='Add comment'/>
      <Button>Add comment</Button>
      </div>
    </div>
  </div>;
}