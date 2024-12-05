import React from "react";
import Link from "next/link";
import styles from "./layout.module.css";
import "@/styles/globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={`${styles.wrapper} dark`}>
        <header>
          <Link href="/" className={styles.logo}>
            Pado
          </Link>
        </header>
        <main>{children}</main>
        {/* 푸터 변경해야함 */}
        <footer>
          <div>Pado</div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
