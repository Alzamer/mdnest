'use client';

import style from "./style.module.css";
import ProfileHeader from "../../components/ProfileHeader";
import TabsWrapper from "../../components/TabsWrapper";
import { redirect } from 'next/navigation';
import useGetUser from "../../../../utils/hooks/useGetUser";
import { TailSpin } from "react-loader-spinner";

export default function Page({ params }: { params: { id: string } }) {
  const { user, userIsNull } = useGetUser(params.id);
  if (userIsNull)
    redirect('/');

  if (user === null)
    return <div className={style.loading}><TailSpin
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    /></div>;

  return (
    <div className={style.flexContainer}>
      <div className={style.container}>
        <ProfileHeader
          picture={user!.picture}
          username={user!.username}
          date={user!.created_at}
        />
        <TabsWrapper />
      </div>
    </div>
  );
}
