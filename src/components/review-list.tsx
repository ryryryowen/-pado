import { IReviewResults, IUserReview } from "@/types";
import style from "@/styles/review-list.module.css";
import Image from "next/image";
import defaultProfile from "@/images/DefaultProfile.jpg";
import { FaStar } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const ReviewList = async ({
  params,
  reviews,
}: {
  params: { id: string };
  reviews: IReviewResults;
}) => {
  const response = await fetch(`http://localhost:3000/api/movie/${params.id}`, {
    headers: { Accept: "application/json" },
    next: {
      tags: [`review-${params.id}`],
    },
  });
  const userReviews: IUserReview[] = await response.json();
  console.log(userReviews);
  const formattedTmdbReviews = reviews.results.map((review) => {
    return {
      ...review,
      author_details: {
        ...review.author_details,
        rating: Math.floor(review.author_details.rating / 2),
      },
    };
  });
  return (
    <section className={style.reviewsContainer}>
      <h5 className={style.reviewsTitle}>
        리뷰 ({reviews.total_results + userReviews.length})
      </h5>
      {userReviews.map((review) => (
        <div className={style.reviewItem}>
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
      {formattedTmdbReviews.map((review) => (
        <div className={style.reviewItem}>
          <div className={style.reviewItemHeader}>
            <div className={style.ratings}>
              <div className={style.reviewRating}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    size={18}
                    color={
                      index >= review.author_details.rating ? "#666" : "#1451F9"
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
                {review.author_details.username.split("").map((name, index) => {
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
            <FaEllipsisVertical />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewList;
