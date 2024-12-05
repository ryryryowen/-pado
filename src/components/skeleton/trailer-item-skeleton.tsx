import React from "react";
import style from "@/styles/skeleton/trailer-item-skeleton.module.css";

const TrailerItemSkeleton = () => {
  return (
    <div className={style.trailerItem}>
      <div className={style.trailerVideo} />
      <div></div>
      <div className={style.trailerDate}></div>
    </div>
  );
};

export default React.memo(TrailerItemSkeleton);
