'use client'

import style from './style.module.css';
import { MdDarkMode } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import Modal from 'react-modal';
import { useState, useCallback, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '../../../../utils/supabase/client';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'

const supabase = createClient();

export default function Header(){
  const router = useRouter();
  const [signInModal, setSignInModal] = useState(false);
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


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  }

  Modal.setAppElement('body');

  return <div className={`${style.container}`}>
    <div className={style.left}>
      <span className={style.logo} onClick={() => router.push('/')}>MDNest</span>
    </div>
    <div className={style.searchbar}>

    </div>
    <div className={style.right}>
      <div className={style.darkMode}>
        <MdOutlineDarkMode/>
      </div>
      {
        session ?
        <>
          <p onClick={() => router.push('/profile')}>Profile</p>
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
      />
    </Modal>
  </div>;
}