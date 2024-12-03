"use client";
import { ITrailer, ITrailerResults } from "@/types";
import style from "@/styles/trailer-item.module.css";
import React from "react";

const TrailerItem = ({ name, trailerKey, published_at }: ITrailer) => {
  return (
    <div className={style.trailerItem}>
      <iframe
        className={style.trailerVideo}
        src={`https://www.youtube.com/embed/${trailerKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <p>{name}</p>
      <span className={style.trailerDate}>
        {new Date(published_at).toLocaleDateString()}
      </span>
    </div>
  );
};

export default React.memo(TrailerItem);
