"use client";

import style from "./style.module.css";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../../../../utils/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Whisper } from "next/font/google";
import { useRouter } from "next/navigation";
import useSignOut from "../../../../utils/hooks/useSignOut";
import useGetCurrentUser from "../../../../utils/hooks/useGetCurrentUser";

const whisper = Whisper({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  const router = useRouter();
  const [signInModal, setSignInModal] = useState(false);
  const { user } = useGetCurrentUser();

  useEffect(() => {
    if(user)
    setSignInModal(false);
  }, [user]);

  Modal.setAppElement("body");

  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>
        <span
          className={`${whisper.className} ${style.logo}`}
          onClick={() => router.push("/")}
        >
          MDNest
        </span>
      </div>
      <div className={style.searchbar}></div>
      <div className={style.right}>
        <div className={style.darkMode}>
          <MdOutlineDarkMode />
        </div>
        {user ? (
          <>
            <p onClick={() => router.push("/profile")}>Profile</p>
            <p onClick={() => useSignOut(router)}>Sign Out</p>
          </>
        ) : (
          <p onClick={() => setSignInModal(true)}>Sign In</p>
        )}
      </div>
      <div className={style.rightSmall}>
        <TiThMenu size="1.5em" onClick={() => setSignInModal(true)} />
      </div>
      <Modal
        isOpen={signInModal}
        onAfterOpen={() => null}
        onRequestClose={() => setSignInModal(false)}
        className={style.modal}
        contentLabel="Sign in modal"
      >
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          appearance={{ theme: ThemeSupa }}
        />
      </Modal>
    </div>
  );
}
