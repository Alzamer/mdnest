"use client";

import { Input, Button } from "semantic-ui-react";
import style from "./style.module.css";
import { ReactElement, useEffect, useState } from "react";
import supabase from "../../../../utils/supabase/client";
import Comment from "../Comment";
import { ToastContainer, toast } from "react-toastify";
import { Database } from "@/app/types/supabase";
import "react-toastify/dist/ReactToastify.css";

export default function Comments({
  children,
  id,
  uuid,
}: {
  children: ReactElement;
  id: string;
  uuid: string;
}) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    Database["public"]["Tables"]["comment"]["Row"][]
  >([]);

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.thumbs}>
          <span>👍</span>
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
