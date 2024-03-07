import style from './style.module.css';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function Header(){
  const { theme, setTheme } = useTheme();
  return <div className={style.container}>
    <div className={style.left}>
      <span>MDNest</span>
    </div>
    <div className={style.searchbar}>

    </div>
    <div className={style.right}>
      <div className={style.darkMode}>
        {theme === "dark" && <MdDarkMode/>}
      </div>
      <p>Log In</p>
      <p onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>Sign Up</p>
    </div>
  </div>;
}