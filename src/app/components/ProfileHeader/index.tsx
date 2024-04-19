import style from './style.module.css';
import { createClient } from '../../../../utils/supabase/server';
import { Database } from '@/app/types/supabase';

const supabase = createClient();

export default async function ProfileHeader() {
  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (getUserError)
    throw getUserError;

  if (user === null)
    return;

  const { data, error } = await supabase
    .from('profiles')
    .select()
    .match({
      id: user.id
    });

  if (error)
    throw error;

  return <div className={style.profile}>
    <div className={style.profileInfo}>
      <div className={style.picture} style={{ backgroundImage: `url(${data[0].picture})`, backgroundPosition: 'center' }}>
      </div>
      <div>
        <p className={style.username}>{data[0].username}</p>
        <p className={style.date}></p>
      </div>
    </div>
  </div>
}