"use client";
import React from "react";
import { motion } from "framer-motion";

const MenuIndicator = () => {
  return (
    <motion.hr
      layoutId="menu-indicator"
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      }}
    />
  );
};

export default React.memo(MenuIndicator);
