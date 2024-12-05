import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default layout;
