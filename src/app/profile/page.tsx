import style from './style.module.css'

export default function Page(){
  return <div className={style.container}>
    <div className={style.profile}>
      <div className={style.profileInfo}>
        <div className={style.picture}>

        </div>
        <div>
          <p className={style.username}>USERNAME</p>
          <p className={style.date}>CREATED AT</p>
        </div>
        <button>Follow</button>
      </div>
    </div>
  </div>;
}