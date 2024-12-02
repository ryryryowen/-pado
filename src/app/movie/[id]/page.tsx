import React from "react";
import style from "@/styles/detail-modal.module.css";
import { IMovieData, IResults, ITrailerResults } from "@/types";
import adultBadge from "@/images/adultTrueBadge.svg";
import adultFalseBadge from "@/images/adultFalseBadge.svg";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";

const DetailModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const urls = [
    `${process.env.NEXT_TMDB_BASEURL}/movie/${(await params).id}?api_key=${
      process.env.NEXT_TMDB_API_KEY
    }&language=ko-KR`,
    `${process.env.NEXT_TMDB_BASEURL}/movie/${
      (await params).id
    }/similar?api_key=${process.env.NEXT_TMDB_API_KEY}&language=ko-KR`,
    `${process.env.NEXT_TMDB_BASEURL}/movie/${
      (await params).id
    }/videos?api_key=${process.env.NEXT_TMDB_API_KEY}&language=ko-KR`,
  ];

  const responses = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );

  const [data, similar, trailerData] = (await Promise.all(responses)) as [
    IMovieData,
    IResults,
    ITrailerResults
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <div
          className={style.detailBanner}
          style={{
            background: data.backdrop_path
              ? `linear-gradient(to right, #162447 30%, rgba(0, 0, 0, 0.3)), url(https://media.themoviedb.org/t/p/original/${data.backdrop_path}) 200px center/cover no-repeat`
              : `linear-gradient(to right, #162447 30%, rgba(0, 0, 0, 0.3)), url(https://media.themoviedb.org/t/p/original/${data.poster_path}) 200px center/cover no-repeat `,
          }}
        >
          <IoMdClose className={style.closeIcon} size={20} />
          <div className={style.bannerContent}>
            <div className={style.headerDesc}>
              <h1 className={style.descTitle}>
                <span>
                  <FaStar />
                  {parseFloat(data.vote_average).toFixed(2)}
                </span>
                {data?.title || data?.original_title}
                <div className={style.genre}>
                  {data?.genres?.map((item, i, arr) => (
                    <span className={style.genreItem} key={i}>
                      {i === arr.length - 1 ? item.name : `${item.name} | `}
                    </span>
                  ))}
                  <Image
                    src={data.adult ? adultBadge : adultFalseBadge}
                    alt="연령등급"
                    className={style.adultBadge}
                  />
                </div>
              </h1>
              <div className={style.descContent}>
                <div className={style.playButtonContainer}>
                  <button className={style.playButton}>
                    <FaPlay size={16} />
                  </button>
                  <span>트레일러 재생하기</span>
                </div>
                <div className={style.quickMenu}>
                  <div className={style.quickMenuItem}>
                    <CiStar size={28} strokeWidth={0.8}/>
                    <span>리뷰 남기기</span>
                  </div>
                  <div className={style.quickMenuItem}>
                    <CiHeart size={28} strokeWidth={0.8}/>
                    <span>보고 싶어요</span>
                  </div>
                </div>
                {/* <span className={style.descDate}>{data?.release_date}</span>
                <span className={style.descVoteAvg}>{data?.vote_average}</span>
                <span className={style.descVote}>{data?.vote_count}</span> */}
              </div>
              <p className={style.descOverview}>{data?.overview}</p>
              <button className={style.descCheckout}>결제하기</button>
            </div>
            <img
              className={style.headerImg}
              src={`https://media.themoviedb.org/t/p/original/${data?.poster_path}`}
              alt="thumbnail"
            />
          </div>
        </div>
        <div className={style.detailContent}>
          <h2 className={style.contentTitle}>영화정보</h2>
          <div className={style.language}>
            <b>언어: </b>
            {data?.original_language}
          </div>
          <div className={style.popularity}>
            <b>인기점수: </b>
            <i style={{ textDecoration: "underline", fontStyle: "italic" }}>
              {data?.popularity} / 10000점
            </i>
          </div>
        </div>
        <iframe
          className={style.detailVideo}
          src={`https://www.youtube.com/embed/${trailerData?.results[0]?.key}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default DetailModal;
