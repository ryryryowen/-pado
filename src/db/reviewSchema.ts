import mongoose, { models, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reviewSchema = new Schema({
  movieId: {
    type: String,
    required: true,
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

//초기화될때 한번이 아닌 값이 추가될때마다 몽고디비에 접근하므로 이미 존재하는지를 확인해야함.
const ReviewModel =
  models.ReviewModel || mongoose.model("Review", reviewSchema);

export default ReviewModel;
