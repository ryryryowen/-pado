"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/contentslider.module.css";
import { Movie } from "@/utils/utills";

interface ContentSliderProps {
  title: string;
  movies: Movie[];
}

const ContentSlider = ({ title, movies }: ContentSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;

    // 드래그 방향 감지
    if (Math.abs(walk) > 100) {
      // 100px 이상 드래그 했을 때
      if (walk > 0 && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      } else if (walk < 0 && currentPage < totalPages - 1) {
        setCurrentPage((prev) => prev + 1);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 페이지 변경 시 스크롤 애니메이션
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth / itemsPerPage;
      sliderRef.current.scrollTo({
        left: cardWidth * itemsPerPage * currentPage,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  // 현재 페이지에 해당하는 영화들만 표시
  const visibleMovies = movies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className={styles.sliderContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {visibleMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <div className={styles.movieInfo}>
              <h3>{movie.title}</h3>
              <p>{movie.release_date.split("-")[0]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 인디케이터 추가 */}
      <div className={styles.pageIndicator}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentPage === index ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSlider;
