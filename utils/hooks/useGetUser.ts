import supabase from "../supabase/client";
import { useState, useEffect } from "react";

interface user {
  activities: string[];
  downvoted: string[];
  following: string[];
  id: string;
  picture: string;
  upvoted: string[];
  username: string;
};

export default function useGetUser(id: string) {
  const [user, setUser] = useState<user | null>(null);
  const [userIsNull, setUserIsNull] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .match({
          id: id
        });

      if (data === null || error)
        setUserIsNull(true);
      else
        setUser(data[0]);
    }

    fetchUser();
  }, [])

  return {
    user: user,
    userIsNull: userIsNull
  }
};