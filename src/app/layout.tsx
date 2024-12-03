import React, { ReactNode } from "react";
import "@/styles/globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <head>
        <script defer src="https://www.youtube.com/player_api"></script>
      </head>
      <body>
        {children}
        <div>Hello Pado</div>
      </body>
    </html>
  );
};

export default Layout;
