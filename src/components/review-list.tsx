import { IReviewResults, IUserReview } from "@/types";
import style from "@/styles/review-list.module.css";
import Image from "next/image";
import defaultProfile from "@/images/defaultProfile.jpg";
import { FaStar } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSlashSolid } from "react-icons/lia";
import ReviewModel from "@/db/reviewSchema";
import connectDB from "@/db/mongodb";

const ReviewList = async ({
  params,
  reviews,
}: {
  params: { id: string };
  reviews: IReviewResults;
}) => {
  let userReviews: IUserReview[] = [];

  try {
    // const response = await fetch(
    //   `https://pado-ott.vercel.app/api/movie/645757`,
    //   {
    //     headers: { Accept: "application/json" },
    //     next: {
    //       tags: [`review-${params.id}`],
    //       revalidate: 30,
    //     },
    //   }
    // );

    await connectDB();

    const response = await ReviewModel.find({ movieId: params.id }).sort({
      createdAt: "desc",
    });
    console.log(response);

    if (!response) throw new Error("Failed to fetch reviews");
    // userReviews = await response.json();
    userReviews = response;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    // Continue with empty userReviews array
  }

  const formattedTmdbReviews = reviews.results.map((review) => ({
    ...review,
    author_details: {
      ...review.author_details,
      rating:
        Math.floor(review.author_details.rating / 2) === 0
          ? 1
          : Math.floor(review.author_details.rating / 2),
    },
  }));

  return (
    <section className={style.reviewsContainer}>
      <h5 className={style.reviewsTitle}>
        리뷰 ({reviews.total_results + userReviews.length})
      </h5>
      {reviews.total_results + userReviews.length > 0 ? (
        <>
          {userReviews.map((review, index) => (
            <div key={index} className={style.reviewItem}>
              <div className={style.reviewItemHeader}>
                <div className={style.ratings}>
                  <div className={style.reviewRating}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        size={18}
                        color={index >= review.ratings ? "#666" : "#1451F9"}
                      />
                    ))}
                    <span>{review.ratings}</span>
                  </div>
                </div>
                <div className={style.user}>
                  {/* 최대 10자리로, 적으면 그대로 3자리만 나오게하고 나머지 asterisk */}
                  <span>
                    {/* {review.author}(
                  {review.author_details.username.split("").map((name, index) => {
                    if (index > 2) name = "*";
                    if (index > 9) return;
                    return name;
                  })}
                  ) */}
                  </span>
                  {/* <Image
                  src={
                    review.author_details.avatar_path
                      ? `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`
                      : defaultProfile
                  }
                  width={30}
                  height={30}
                  unoptimized
                  alt="profileImg"
                /> */}
                </div>
              </div>
              {/* 1시간 전이 아닐때는 그냥 방금 전으로 통일 */}
              <span className={style.reviewDate}>방금 전</span>
              <p className={style.reviewContent}>{review.content}</p>
              <div className={style.reviewQuickmenu}>
                <p>
                  <AiOutlineLike size={16} /> {review.likes}
                </p>
                <FaEllipsisVertical />
              </div>
            </div>
          ))}
          {formattedTmdbReviews.map((review, index) => (
            <div key={index} className={style.reviewItem}>
              <div className={style.reviewItemHeader}>
                <div className={style.ratings}>
                  <div className={style.reviewRating}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        size={18}
                        color={
                          index >= review.author_details.rating
                            ? "#666"
                            : "#1451F9"
                        }
                      />
                    ))}
                    <span>{review.author_details.rating}</span>
                  </div>
                </div>
                <div className={style.user}>
                  {/* 최대 10자리로, 적으면 그대로 3자리만 나오게하고 나머지 asterisk */}
                  <span>
                    {review.author}(
                    {review.author_details.username
                      .split("")
                      .map((name, index) => {
                        if (index > 2) name = "*";
                        if (index > 9) return;
                        return name;
                      })}
                    )
                  </span>
                  <Image
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`
                        : defaultProfile
                    }
                    width={30}
                    height={30}
                    unoptimized
                    alt="profileImg"
                  />
                </div>
              </div>
              {/* 1시간 전이 아닐때는 그냥 방금 전으로 통일 */}
              <span className={style.reviewDate}>방금 전</span>
              <p className={style.reviewContent}>{review.content}</p>
              <div className={style.reviewQuickmenu}>
                <p>
                  <AiOutlineLike size={16} /> 0
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={style.noReviews}>
          <LiaCommentSlashSolid size={300} strokeWidth={0.01} color="#555" />
          <span>댓글이 없습니다.</span>
        </div>
      )}
    </section>
  );
};

export default ReviewList;
