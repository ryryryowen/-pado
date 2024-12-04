import { IUserReview } from "../../../../types";
import { NextResponse } from "next/server";

const reviewData: {
  [key: string]: IUserReview[];
} = {};

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const movieId = (await params).id;
  const movieReviews = reviewData[movieId] || [];
  return NextResponse.json(movieReviews);
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const movieId = (await params).id;
  const review = await request.json();
  // Initialize array for this movie if it doesn't exist
  if (!reviewData[movieId]) {
    reviewData[movieId] = [];
  }

  reviewData[movieId].push(review);

  return NextResponse.json({
    success: true,
  });
};
