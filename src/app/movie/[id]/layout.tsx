import React, { ReactNode } from "react";
import style from "@/styles/detail-modal-layout.module.css";
import styles from "@/styles/page.module.css";
import ContentSlider from "@/components/content";
import MainBanner from "@/components/mainbanner";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@/utils/tmdb";
import DetailModalOverlay from "@/components/detail-modal-overlay";
import ProtectedRoute from "@/components/ProtectedRoute";
const Layout = async ({
  children,
  reviews,
  similar,
}: {
  children: ReactNode;
  reviews: ReactNode;
  similar: ReactNode;
}) => {
  const trendingMovies = await fetchTrendingMovies();
  const popularMovies = await fetchPopularMovies();
  const topRatedMovies = await fetchTopRatedMovies();

  return (
    <ProtectedRoute>
      <div className={styles.mainContainer}>
        <MainBanner movies={trendingMovies} />

        <section className={styles["content-section"]}>
          <ContentSlider
            title="믿고 보는 파도 에디터 추천작"
            movies={trendingMovies}
          />
          <ContentSlider title="실시간 인기 콘텐츠" movies={popularMovies} />
          <ContentSlider title="오직 파도에서" movies={topRatedMovies} />
        </section>
      </div>
      <div className={style.container}>
        {children}
        <div className={style.slotWrapper}>
          {reviews}
          {similar}
        </div>
      </div>
      <DetailModalOverlay />
    </ProtectedRoute>
  );
};

export default Layout;
