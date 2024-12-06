import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import OverflowControl from "@/components/OverflowControl";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <Header />
          <OverflowControl>
            <main>{children}</main>
          </OverflowControl>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
