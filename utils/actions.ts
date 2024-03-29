'use server'

import { createClient } from './supabase/client';
import { redirect } from 'next/navigation'

export async function navigate(url: string) {
  redirect(url);
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if(error)
    return false;
  return true;
}