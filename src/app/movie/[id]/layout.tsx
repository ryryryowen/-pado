import React, { ReactNode } from "react";
import style from "@/styles/detail-modal-layout.module.css";
const Layout = ({
  children,
  reviews,
  similar,
}: {
  children: ReactNode;
  reviews: ReactNode;
  similar: ReactNode;
}) => {
  return (
    <>
      {children}
      <div className={style.slotWrapper}>
        {reviews}
        {similar}
      </div>
    </>
  );
};

export default Layout;
