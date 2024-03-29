'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../../../utils/supabase/client';

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if(error)
    return false;
  return true;
}

export async function navigate(url: string){
  redirect(url);
}