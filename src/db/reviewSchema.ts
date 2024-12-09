import mongoose, { models, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reviewSchema = new Schema({
  movieId: {
    type: String,
    required: true,
    index: true,
  },
  id: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  ratings: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
});

const ReviewModel = models.Review || mongoose.model("Review", reviewSchema);

export default ReviewModel;
