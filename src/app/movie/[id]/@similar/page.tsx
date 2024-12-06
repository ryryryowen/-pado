import React from "react";
import style from "@/styles/reviews-slot.module.css";
import { IResults } from "@/types";
import Image from "next/image";
import Link from "next/link";

const SimilarVideos = async ({
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
    }/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`
  );
  const { results: similarVideos }: IResults = await response.json();
  if ((await searchParams).route !== "similar") {
    return null;
  }
  return (
    <>
      <h4>유사한 작품</h4>
      <section className={style.similarMoviesContainer}>
        {similarVideos.map((video, index) => (
          <div key={index} className={style.similarMovieItem}>
            <Link href={`/movie/${video.id}`}>
              <Image
                src={
                  video.poster_path
                    ? `https://image.tmdb.org/t/p/w185${video.poster_path}`
                    : `https://image.tmdb.org/t/p/w185${video.backdrop_path}`
                }
                alt={video.original_title}
                width={240}
                height={140}
              />
              <span>{video.title}</span>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default SimilarVideos;
