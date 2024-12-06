"use client";
import { ITrailer } from "@/types";
import style from "@/styles/trailer-item.module.css";
import React, { useState } from "react";
import TrailerItemSkeleton from "./skeleton/trailer-item-skeleton";

const TrailerItem = ({ name, trailerKey, published_at }: ITrailer) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <TrailerItemSkeleton />}
      <div
        className={style.trailerItem}
        style={{ display: isLoading ? "none" : "block" }}
      >
        <iframe
          id={`youtube-${trailerKey}`}
          className={style.trailerVideo}
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
        />
        <p>{name}</p>
        <span className={style.trailerDate}>
          {new Date(published_at).toLocaleDateString()}
        </span>
      </div>
    </>
  );
};

export default React.memo(TrailerItem);
