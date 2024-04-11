import style from './style.module.css';

export default async function NoteCard(){
  return <div className={style.container}>
    <h1>Example #1</h1>
    <div className={style.info}>
      <p>Author</p>
      <p>Upvotes</p>
      <p>Date</p>
    </div>
    <div className={style.description}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam orci purus, nec bibendum arcu ultrices non. Ut et mi elit. Mauris non metus lacus...
    </div>
  </div>;
}