import style from './style.module.css';
import { createClient } from '../../../../utils/supabase/server';

const supabase = createClient();

export default async function ProfileHeader(){
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
  .from('profiles')
  .select()
  .match({
    id: user!.id
  });

  return  <div className={style.profile}>
    <div className={style.profileInfo}>
      <div className={style.picture} style={{ backgroundImage: `url(${data![0].picture})`, backgroundPosition: 'center'}}>
      </div>
      <div>
        <p className={style.username}>{ data![0].username }</p>
        <p className={style.date}></p>
      </div>
    </div>
  </div>
}