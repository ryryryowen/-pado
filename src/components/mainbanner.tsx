"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/mainbanner.module.css";
import { Movie } from "@/utils/utills";
import Link from "next/link";

interface MainBannerProps {
  movies: Movie[];
}

const MainBanner = ({ movies }: MainBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      handleSlideChange((currentIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies, currentIndex]);

  if (!movies?.length) {
    return <div className={styles.banner}>Loading...</div>;
  }

  const handleSlideChange = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // 애니메이션 시간과 동일하게 설정
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const endX = e.clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      handleSlideChange((currentIndex + 1) % movies.length);
    } else if (diff < -50) {
      handleSlideChange(
        currentIndex === 0 ? movies.length - 1 : currentIndex - 1
      );
    }

    isDragging.current = false;
  };

  return (
    <div className={styles.bannerWrapper}>
      <div
        className={styles.bannerSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className={styles.bannerSlide}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className={styles.overlay} />
            <div className={styles.bannerContent}>
              <h1 className={styles.title}>{movie.title}</h1>
              <p className={styles.overview}>{movie.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
