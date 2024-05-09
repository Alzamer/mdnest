import style from "./style.module.css";

export default function ProfileHeader({ picture, username, date } : {
  picture: string,
  username: string,
  date: string
}) {

  return (
    <div className={style.profile}>
      <div className={style.profileInfo}>
        <div
          className={style.picture}
          style={{
            backgroundImage: `url(${picture})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div>
          <p className={style.username}>{ username }</p>
          <p className={style.date}>Created: { date }</p>
        </div>
      </div>
    </div>
  );
}
