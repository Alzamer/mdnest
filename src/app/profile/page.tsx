import style from './style.module.css';
import ProfileHeader from '../components/ProfileHeader';
import TabsWrapper from '../components/TabsWrapper';

export default function Page(){
  return <div className={style.flexContainer}>
    <div className={style.container}>
      <ProfileHeader/>
      <TabsWrapper/>
    </div>
  </div>;
}