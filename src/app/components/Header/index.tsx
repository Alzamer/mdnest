'use client'

import style from './style.module.css';
import { MdDarkMode } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import Modal from 'react-modal';
import { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes'
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '../../../../utils/supabase/client';
import { signOut } from './actions';

const supabase = createClient();

export default function Header(){
  const [signInModal, setSignInModal] = useState(false);
  const { theme, setTheme } = useTheme()
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if(session !== null)
      setSignInModal(false);
  }, [session]);

  const switchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const handleSignOut = async () => {
    const result = await signOut();
    if(result)
      setSession(null);
  }

  Modal.setAppElement('body');

  return <div className={style.container}>
    <div className={style.left}>
      <span className={style.logo}>MDNest</span>
    </div>
    <div className={style.searchbar}>

    </div>
    <div className={style.right}>
      <div className={style.darkMode} onClick={switchTheme}>
        { theme === 'light' ? <MdDarkMode/> : <MdOutlineDarkMode/>}
      </div>
      {
        session ?
        <p onClick={handleSignOut}>Sign Out</p>
        : <p onClick={() => setSignInModal(true)}>Sign In</p>
      }
    </div>
    <div className={style.rightSmall}>
      <TiThMenu size="1.5em"/>
    </div>
    <Modal
      isOpen={signInModal}
      onAfterOpen={() => null}
      onRequestClose={() => setSignInModal(false)}
      className={style.modal}
      contentLabel="Sign in modal">
      <Auth supabaseClient={supabase}/>
    </Modal>
  </div>;
}