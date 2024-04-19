import style from './style.module.css';
import ProfileHeader from '../components/ProfileHeader';
import TabsWrapper from '../components/TabsWrapper';
import { Suspense } from 'react';

export default function Page() {
  return <div className={style.flexContainer}>
    <div className={style.container}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProfileHeader />
      </Suspense>
      <TabsWrapper />
    </div>
  </div>;
}