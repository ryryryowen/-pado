import { IReviewResults } from "@/types";
import React from "react";
import style from "@/styles/reviews-slot.module.css";

const ReviewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const response = await fetch(
    `${process.env.NEXT_TMDB_BASEURL}/movie/${
      (
        await params
      ).id
    }/reviews?api_key=${process.env.NEXT_TMDB_API_KEY}`
  );
  const reviewsData: IReviewResults = await response.json();
  console.log(reviewsData);
  return (
    <>
      <h2 className={style.reviewTitle}>내 리뷰</h2>
    </>
  );
};

export default ReviewsPage;
