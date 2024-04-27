"use client";

import { useEffect, useState } from "react";
import styles from "./style.module.css";
import supabase from "../../../../utils/supabase/client";

export default function Comment({
  author,
  comment,
  createdAt,
}: {
  author: string;
  comment: string;
  createdAt: string;
}) {
  const [commentAuthor, setCommentAuthor] = useState("");
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .match({
          id: author,
        });

      if (error) throw error;

      setCommentAuthor(data[0].username);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <p>
        {commentAuthor ? commentAuthor : <span>Loading...</span>}{" "}
        {createdAt.slice(0, 10)}
      </p>
      <p>{comment}</p>
    </div>
  );
}
