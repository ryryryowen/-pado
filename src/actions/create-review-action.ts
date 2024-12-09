/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import ReviewModel from "@/db/reviewSchema";
import { revalidatePath } from "next/cache";
const createReviewAction = async (_: any, formData: FormData) => {
  const movieId = formData.get("movieId");
  const ratings = formData.get("ratings");
  const content = formData.get("reviewContent");
  if (!ratings || !content || !movieId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }
  try {
    // const response = await fetch(
    //   `https://pado-ott.vercel.app/api/movie/${movieId}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ratings, movieId, content }),
    //   }
    // );
    // console.log(response.status);
    try {
      const response = await ReviewModel.create({
        movieId,
        ratings,
        content,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    revalidatePath(`review-${movieId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${error}`,
    };
  }
};

export default createReviewAction;
