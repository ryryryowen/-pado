import React from "react";
import { ReactNode } from "react"; // children 타입 지정
import { Html } from "next/document";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
