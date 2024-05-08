import styles from "./page.module.css";
import Filter from "./components/Filter";
import { Lato } from "@next/font/google";
import Pagination from "./components/Pagination";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {

  return (
    <div className={`${styles.container} ${lato.className}`}>
      <Filter upvotes={1} dates={1} authors={2}/>
      <Pagination count={3} />
    </div>
  );
}
