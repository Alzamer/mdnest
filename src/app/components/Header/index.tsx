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
import { signOut, navigate } from './actions';
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient();

export default function Header(){
  const [signInModal, setSignInModal] = useState(false);
  const [session, setSession] = useState(null);
  const { theme, setTheme } = useTheme()

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
    if(result){
      setSession(null);
      navigate('/');
    }
  }

  Modal.setAppElement('body');

  return <div className={`${style.container} ${theme === 'dark' ? style.dark : null}`}>
    <div className={style.left}>
      <span className={style.logo} onClick={() => navigate('/')}>MDNest</span>
    </div>
    <div className={style.searchbar}>

    </div>
    <div className={style.right}>
      <div className={style.darkMode} onClick={switchTheme}>
        { theme === 'light' ? <MdDarkMode/> : <MdOutlineDarkMode/>}
      </div>
      {
        session ?
        <>
          <p onClick={() => navigate('/profile')}>Profile</p>
          <p onClick={handleSignOut}>Sign Out</p>
        </>
        : <p onClick={() => setSignInModal(true)}>Sign In</p>
      }
    </div>
    <div className={style.rightSmall}>
      <TiThMenu size="1.5em" onClick={() => setSignInModal(true)}/>
    </div>
    <Modal
      isOpen={signInModal}
      onAfterOpen={() => null}
      onRequestClose={() => setSignInModal(false)}
      className={style.modal}
      contentLabel="Sign in modal">
      <Auth 
        supabaseClient={supabase}
        providers={['google']}
        appearance={{ theme: ThemeSupa }}
        theme={theme === 'dark' ? 'dark' : 'default'}
      />
    </Modal>
  </div>;
}