import Content from '../components/Content';
import Filter from '../components/Filter';
import style from './style.module.css'

export default function Page(){
  return <div className={style.container}>
		<Filter/>
		<Content/>
  </div>;
}