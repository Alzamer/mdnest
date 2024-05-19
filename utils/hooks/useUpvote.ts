
import { Session } from "@supabase/supabase-js";
import supabase from "../../utils/supabase/client";
import { useState, useEffect } from "react";

export default function useUpvote(id: string | null, accessToken: Session | null, forceChange: boolean) {
  const [isError, setIsError] = useState('');
  const [alreadyUpvoted, setAlreadyUpvoted] = useState<boolean | null>(null);

  async function checkIfUpvoted() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .match({
        id: accessToken?.user.id
      });

    if (error) {
      setIsError(`Error: ${error.code} ${error.message}`);
      return;
    }

    if (data[0].upvoted !== null && id !== null && data[0].upvoted.includes(id))
      setAlreadyUpvoted(true);
    else
      setAlreadyUpvoted(false);
  }

  async function updateProfile() {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .match({
        id: accessToken?.user.id
      });

    if (error) {
      setIsError(`Error: ${error.code} ${error.message}`);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        ...data[0],
        upvoted: data[0].upvoted ?
          [...data[0].upvoted, id!]
          : [id!]
      })
      .match({
        id: accessToken?.user.id
      });

    if (updateError) {
      setIsError(`Error: ${updateError.code} ${updateError.message}`);
      return;
    }
  };

  async function updateNoteVoteCounter() {
    const { data, error } = await supabase
      .from('note')
      .select()
      .match({
        id: id
      });

    if (error) {
      setIsError(`Error: ${error.code} ${error.message}`);
      return;
    }

    const { error: updateError } = await supabase
      .from('note')
      .update({
        ...data[0],
        upvotes: data[0].upvotes + 1
      })
      .match({
        id: id
      });

    if (updateError) {
      setIsError(`Error: ${updateError.code} ${updateError.message}`);
      return;
    }
  }

  useEffect(() => {
    if (id === null || accessToken === null)
      return;

    checkIfUpvoted();
  }, [id, accessToken, forceChange]);

  useEffect(() => {
    if(alreadyUpvoted === null)
      return;

    if(!alreadyUpvoted){
      updateProfile();
      updateNoteVoteCounter();
    }

  }, [alreadyUpvoted]);

  return {
    error: isError,
    alreadyUpvoted: alreadyUpvoted
  }
};