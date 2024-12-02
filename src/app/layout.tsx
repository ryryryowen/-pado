import React, { ReactNode } from "react";
import "@/styles/globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        {children}
        <div>Hello Pado</div>
      </body>
    </html>
  );
};

export default Layout;
