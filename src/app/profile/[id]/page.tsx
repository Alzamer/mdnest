'use client';

import style from "./style.module.css";
import ProfileHeader from "../../components/ProfileHeader";
import TabsWrapper from "../../components/TabsWrapper";
import { redirect } from 'next/navigation';
import useGetUser from "../../../../utils/hooks/useGetUser";

export default function Page({ params }: { params: { id: string } }) {
  const { user, userIsNull } = useGetUser(params.id);
  if (userIsNull)
    redirect('/');

  if (user === null)
    return <p>Loading...</p>;

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
