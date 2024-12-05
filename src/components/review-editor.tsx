"use client";

import createReviewAction from "@/actions/create-review-action";
import style from "@/styles/reviews-slot.module.css";
import StarList from "./star-list";
import React, { useActionState, useEffect, useState } from "react";

const ReviewEditor = ({ params }: { params: { id: string } }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const [ratings, setRatings] = useState(0);

  return (
    <>
      <StarList ratings={ratings} setRatings={setRatings} />
      <form action={formAction} className={style.reviewForm}>
        <input type="text" name="movieId" value={params.id} readOnly hidden />
        <input type="text" name="ratings" value={ratings} readOnly hidden />
        <textarea
          name="reviewContent"
          placeholder={
            ratings === 0
              ? "별점을 먼저 선택해주세요."
              : "이 작품에 대해 평가를 남겨보세요."
          }
          disabled={isPending || ratings === 0}
          required
        />
        <input
          type="submit"
          value={isPending ? "..." : "등록하기"}
          disabled={isPending || ratings === 0}
        />
      </form>
    </>
  );
};

export default React.memo(ReviewEditor);
