"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Movie } from "@/utils/utills";
import Link from "next/link";
import styles from "@/styles/contentslider.module.css";
import Image from "next/image";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ContentSliderProps {
  title: string;
  movies: Movie[];
}

const ContentSlider = ({ title, movies }: ContentSliderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.sliderContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    );
  }

  return (
    <section className={styles.sliderContainer}>
      <h2 className={styles.title}>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
        className={styles.sliderWrapper}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link
              href={`/movie/${movie.id}`}
              className={styles.movieCardWrapper}
            >
              <div className={styles.movieCard}>
                <Image
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                  width={342}
                  height={513}
                  priority={true}
                />
                <div className={styles.movieInfo}>
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date.split("-")[0]}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ContentSlider;
