import { IReviewResults } from "@/types";
import React from "react";
import style from "@/styles/reviews-slot.module.css";
import ReviewList from "@/components/review-list";
import ReviewEditor from "@/components/review-editor";

const ReviewsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ route: string }>;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_PATH}/movie/${
      (
        await params
      ).id
    }/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { cache: "force-cache" }
  );
  const reviewsData: IReviewResults = await response.json();
  if ((await searchParams).route !== "reviews") {
    return null;
  }
  return (
    <>
      <h2 className={style.reviewTitle}>리뷰 작성하기</h2>
      <ReviewEditor params={await params} />
      <ReviewList params={await params} reviews={reviewsData} />
    </>
  );
};

export default ReviewsPage;
