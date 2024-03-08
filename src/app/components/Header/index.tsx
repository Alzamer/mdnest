'use client'

import style from './style.module.css';
import { MdDarkMode } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import Modal from 'react-modal';
import { useState, useCallback } from 'react';
import { signIn, signUp } from './actions'
import { useTheme } from 'next-themes'

export default function Header(){
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const { theme, setTheme } = useTheme()

  const switchSignInModal = useCallback(() => {
    setSignInModal(!signInModal);
  }, [signInModal, setSignInModal]);

  const switchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const handleSignIn = useCallback(async () => {
    switchSignInModal();
    await signIn("", "");
  }, [switchSignInModal, signIn]);

  Modal.setAppElement('body');

  return <div className={style.container}>
    <div className={style.left}>
      <span>MDNest</span>
    </div>
    <div className={style.searchbar}>

    </div>
    <div className={style.right}>
      <div className={style.darkMode} onClick={switchTheme}>
        { theme === 'light' ? <MdDarkMode/> : <MdOutlineDarkMode/>}
      </div>
      <p onClick={switchSignInModal}>Sign In</p>
      <p onClick={() => setSignUpModal(true)}>Sign Up</p>
    </div>
    <div className={style.rightSmall}>
      <TiThMenu size="1.5em"/>
    </div>
    <Modal
      isOpen={signInModal}
      onAfterOpen={() => null}
      onRequestClose={switchSignInModal}
      className={style.modal}
      contentLabel="Sign in modal">
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={handleSignIn}>Log in</button>
      </form>
    </Modal>
    <Modal
      isOpen={signUpModal}
      onAfterOpen={() => null}
      onRequestClose={() => setSignUpModal(false)}
      className={style.modal}
      contentLabel="Sign up modal">
    </Modal>
  </div>;
}