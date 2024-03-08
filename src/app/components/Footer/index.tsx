import style from './style.module.css';

export default function Footer(){
  return <div className={style.container}>
    <div className={style.column}>
      <p>Link #1</p>
      <p>Link #2</p>
      <p>Link #3</p>
      <p>Link #4</p>
      <p>Link #5</p>
      <p>Link #6</p>
    </div>
  </div>;
}