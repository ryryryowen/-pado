import ReviewModel from "@/db/reviewSchema";
import { NextResponse } from "next/server";
import connectDB from "@/db/mongodb";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();
    const reviews = await ReviewModel.find({ movieId: (await params).id }).sort(
      { createdAt: "desc" }
    );
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    console.log("connected");
    await connectDB();
    const body = await request.json();
    const newReview = await ReviewModel.create({
      movieId: (await params).id,
      ...body,
    });
    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Failed to add review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
};
