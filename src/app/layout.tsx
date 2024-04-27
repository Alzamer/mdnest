import "semantic-ui-css/semantic.min.css";
import "./global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Provider from "./themes/Provider";
import { ReactNode } from "react";

export const metadata = {
  title: "MdNest",
  description:
    "A platform to securely store and organize markdown-formatted submissions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
