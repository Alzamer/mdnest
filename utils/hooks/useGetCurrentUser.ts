import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import { Session } from "@supabase/supabase-js";

export default function useGetCurrentUser() {
  const [currentSession, setCurrentSession] = useState<Session | null>();
  useEffect(() => {
    async function retrieveSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentSession(session);

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentSession(session);
      });

      return () => subscription.unsubscribe();
    }

    retrieveSession();
  }, []);

  return {
    user: currentSession ? currentSession : null
  }
};