"use client";

import { Input, Button } from "semantic-ui-react";
import style from "./style.module.css";
import { ReactElement, useState, useEffect } from "react";
import Comment from "../Comment";
import { ToastContainer, toast } from "react-toastify";
import { Database } from "@/app/types/supabase";
import "react-toastify/dist/ReactToastify.css";
import useUpvote from "../../../../utils/hooks/useUpvote";
import useGetCurrentUser from "../../../../utils/hooks/useGetCurrentUser";
import { Session } from "@supabase/supabase-js";

export default function Comments({
  children,
  uuid,
}: {
  children: ReactElement;
  uuid: string;
}) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    Database["public"]["Tables"]["comment"]["Row"][]
  >([]);
  const [pUuid, setpUuid] = useState<string | null>(null);
  const [pUser, setpUser] = useState<Session | null>(null);
  const [forceChange, setForceChange] = useState(false);

  const { user } = useGetCurrentUser();
  const { error, alreadyUpvoted } = useUpvote(pUuid, pUser, forceChange);

  const notify = (msg: string) => toast(msg);

  useEffect(() => {
    if(alreadyUpvoted === null)
      return;
    else if(error)
      notify(error);
    else if(alreadyUpvoted)
      notify("Already upvoted!");
    else if (!alreadyUpvoted)
      notify("Upvoted note!");
  }, [alreadyUpvoted])

  const handleUpvote = () => {
    setpUuid(uuid);
    setpUser(user);
    setForceChange(!forceChange);
  }

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.thumbs}>
          <span onClick={() => handleUpvote()}>👍</span>
          <span>👎</span>
        </div>
        <div className={style.content}>{children}</div>
      </div>
      <div className={style.comments}>
        <div className={style.input}>
          <Input
            size="massive"
            placeholder="Add comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button>Add comment</Button>
        </div>
        <div>
          {
            
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
