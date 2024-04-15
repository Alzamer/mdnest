import styles from './style.module.css';

export default function Comment({ author, comment, createdAt} : { author: string, comment: string, createdAt: string}) {
  return <div className={styles.container}>
    <p>{ author }</p>
    <p>{ comment }</p>
    <p>{ createdAt.slice(0, 10) }</p>
  </div>;
}