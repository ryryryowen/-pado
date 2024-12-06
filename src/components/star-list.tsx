"use client";
import React, { useEffect } from "react";
import style from "@/styles/reviews-slot.module.css";
import { FaStar } from "react-icons/fa";

interface IStarlist {
  ratings: number;
  setRatings: (rating: number) => void;
}

const StarList = ({ ratings, setRatings }: IStarlist) => {
  useEffect(() => {
    return () => setRatings(0);
  }, []);
  return (
    <div className={style.starContainer}>
      <span className={ratings > 0 ? style.ratingActive : undefined}>
        별점을 선택해주세요.
      </span>
      <ul className={style.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            className={style.star}
            key={index}
            onClick={() => setRatings(index + 1)}
          >
            <FaStar
              size={32}
              color={index + 1 > ratings ? "#666" : "#1451F9"}
            />
          </li>
        ))}
        {ratings > 0 && <span className={style.starRating}>{ratings}</span>}
      </ul>
    </div>
  );
};

export default React.memo(StarList);
