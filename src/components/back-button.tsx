"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import style from "@/styles/detail-modal.module.css";
const BackButton = () => {
  const router = useRouter();

  return (
    <>
      <IoMdClose
        onClick={() => router.push("/")}
        className={style.closeIcon}
        size={20}
      />
    </>
  );
};

export default BackButton;
