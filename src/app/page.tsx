import ContentSlider from "@/components/content";
import MainBanner from "@/components/mainbanner";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@/utils/tmdb";
import styles from "@/styles/page.module.css";

export default async function Home() {
  const trendingMovies = await fetchTrendingMovies();
  const popularMovies = await fetchPopularMovies();
  const topRatedMovies = await fetchTopRatedMovies();

  return (
    <div className={styles["main-container"]}>
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
  );
}
