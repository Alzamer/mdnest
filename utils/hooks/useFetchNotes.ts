import supabase from "../../utils/supabase/client";
import { useState, useEffect } from "react";
const CARDS_ON_PAGE = 9;

interface note {
  author: string,
  comments: string[],
  content: string,
  createdAt: string,
  downvotes: number,
  id: string,
  title: string,
  upvotes: number
};

export default function useFetchNotes(page: number) {
  const [result, setResult] = useState<note[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    let currentPage = page - 1;

    async function fetchNotes() {
      setIsPending(true);
      setResult([]);
      let { data: _, count } = await supabase
        .from("note")
        .select("*", { count: "exact" });

      if (count === null)
        count = 0;

      if (currentPage < 0)
        currentPage = 0;

      const NUMBER_OF_PAGES = Math.floor(count / CARDS_ON_PAGE);

      if (currentPage > NUMBER_OF_PAGES)
        currentPage = NUMBER_OF_PAGES;

      const { data, error } = await supabase
        .from("note")
        .select()
        .range(
          currentPage * CARDS_ON_PAGE,
          currentPage * CARDS_ON_PAGE + CARDS_ON_PAGE - 1,
        );

      if (error)
        setIsError(`Error: ${error.code} ${error.message}`);

      if (data === null) {
        setResult([]);
        return;
      }

      for (let i of data) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .match({
            id: i.author,
          });

        if (error) {
          setIsError(`Error: ${error.code} ${error.message}`);
          break;
        }

        i.author = data[0].username;
      }

      setIsPending(false);
      setResult(data);
    };

    fetchNotes();
  }, [page]);

  return {
    result,
    isPending,
    isError
  };
}