"use client";
import React, { useEffect } from "react";
import style from "@/styles/detail-modal.module.css";
import { useRouter } from "next/navigation";

const DetailModalOverlay = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const router = useRouter();
  return <div onClick={() => router.push("/")} className={style.overlay}></div>;
};

export default DetailModalOverlay;
