
import { Session } from "@supabase/supabase-js";
import supabase from "../../utils/supabase/client";
import { useState, useEffect } from "react";

export default function useDownvote(id: string | null, accessToken: Session | null, forceChange: boolean) {
  const [isError, setIsError] = useState('');
  const [alreadyDownvoted, setAlreadyDownvoted] = useState<boolean | null>(null);

  async function checkIfDownvoted() {
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

    if (data[0].downvoted !== null && id !== null && data[0].downvoted.includes(id))
      setAlreadyDownvoted(true);
    else
      setAlreadyDownvoted(false);
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
        downvoted: data[0].downvoted ?
          [...data[0].downvoted, id!]
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

    checkIfDownvoted();
  }, [id, accessToken, forceChange]);

  useEffect(() => {
    if(alreadyDownvoted === null)
      return;

    if(!alreadyDownvoted){
      updateProfile();
      updateNoteVoteCounter();
    }

  }, [alreadyDownvoted]);

  return {
    error: isError,
    alreadyDownvoted: alreadyDownvoted
  }
};