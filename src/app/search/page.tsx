"use client"; // 클라이언트 컴포넌트로 명시

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { GetMoviesResult } from "../api";
import { makeImagePath } from "../uitls";

// 랜덤으로 카테고리 데이터를 가져오는 함수
const getRandomMovies = (movies: any[]) => {
  const shuffled = [...movies].sort(() => 0.5 - Math.random()); // 영화 목록 랜덤 섞기
  return shuffled.slice(0, 6); // 섞은 후 첫 6개만 가져오기
};

export default function SearchPage() {
  const [popularMovies, setPopularMovies] = useState<
    GetMoviesResult["results"]
  >([]);
  const [popularSeries, setPopularSeries] = useState<
    GetMoviesResult["results"]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState<
    GetMoviesResult["results"]
  >([]); // 검색 결과 상태 추가
  const [isSearch, setIsSearch] = useState(false); // 검색 상태를 관리하는 새로운 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태

  // 서버에서 데이터를 fetch하는 부분
  useEffect(() => {
    const fetchMovies = async () => {
      // 영화 데이터 가져오기
      const movieRes = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=614428ff400eba97e5092d23db62b6bd&language=ko"
      );
      const movieData = await movieRes.json();
      setPopularMovies(getRandomMovies(movieData.results)); // 랜덤 6개 가져오기

      // 시리즈 데이터 가져오기
      const seriesRes = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=614428ff400eba97e5092d23db62b6bd&language=ko"
      );
      const seriesData = await seriesRes.json();
      setPopularSeries(getRandomMovies(seriesData.results)); // 랜덤 6개 가져오기

      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  // 영화 검색 처리 함수
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]); // 검색어가 없을 경우 결과를 초기화
      return;
    }

    setIsLoading(true); // 검색 시 로딩 상태로 변경
    setIsSearch(true); // 검색 상태로 변경

    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=614428ff400eba97e5092d23db62b6bd&language=ko&query=${searchTerm}&page=${currentPage}`
    );
    const searchData = await searchRes.json();

    if (searchData.results.length === 0) {
      setSearchResults([]); // 검색 결과가 없을 경우 빈 배열 설정
    } else {
      setSearchResults(searchData.results); // 검색 결과 상태에 설정
    }
    setTotalPages(searchData.total_pages); // 전체 페이지 수 설정
    setIsLoading(false); // 로딩 상태 종료
  };

  // 페이지 변경 처리 함수
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=614428ff400eba97e5092d23db62b6bd&language=ko&query=${searchTerm}&page=${page}`
    );
    const searchData = await searchRes.json();
    setSearchResults(searchData.results); // 새로운 페이지의 검색 결과 상태에 설정
  };

  // 검색 결과를 초기화하고 기존 페이지로 돌아가는 함수
  const handleGoBack = () => {
    setIsSearch(false); // 검색 상태를 해제하고
    setSearchTerm(""); // 검색어 초기화
    setSearchResults([]); // 검색 결과 초기화
  };

  // 엔터 키로 검색 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {isLoading ? (
        <p className={styles.loadIng}>로딩 중...</p>
      ) : (
        <div className={styles.container}>
          {/* 검색 input */}
          <div className={styles.searchbarContainer}>
            <input
              className={styles.movieInput}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 처리
              onKeyDown={handleKeyDown} // Enter 키 눌렀을 때 검색 실행
              placeholder="영화 제목을 검색하세요"
            />
            <button className={styles.movieButton} onClick={handleSearch}>
              검색
            </button>
          </div>

          {/* 검색 결과 표시 */}
          {isSearch && searchResults.length > 0 && (
            <div className={styles.category}>
              <h2>검색 결과</h2>
              <div className={styles.movielist}>
                {searchResults.slice(0, 6).map((movie) => (
                  <div key={movie.id} className={styles.moviecard}>
                    <img
                      src={makeImagePath(movie.poster_path, "w500")}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                  </div>
                ))}
              </div>
              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  {Array.from({ length: Math.min(totalPages, 3) }).map(
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={
                          currentPage === index + 1 ? styles.activePage : ""
                        }
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* 검색 결과가 없을 경우 */}
          {isSearch && searchResults.length === 0 && (
            <div className={styles.noResults}>
              <h2>해당 영화를 찾을 수 없습니다.</h2>
            </div>
          )}

          {/* 기존 페이지로 돌아가기 버튼 */}
          {isSearch && (
            <div className={styles.goBackButton}>
              <button onClick={handleGoBack}>기존 페이지로 돌아가기</button>
            </div>
          )}

          {/* 인기 영화 카테고리 */}
          {!isSearch && !isLoading && (
            <div className={styles.category}>
              <h2>인기 영화</h2>
              <div className={styles.movielist}>
                {popularMovies.map((movie) => (
                  <div key={movie.id} className={styles.moviecard}>
                    <img
                      src={makeImagePath(movie.poster_path, "w500")}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 인기 시리즈 카테고리 */}
          {!isSearch && !isLoading && (
            <div className={styles.category}>
              <h2>인기 시리즈</h2>
              <div className={styles.movielist}>
                {popularSeries.map((series) => (
                  <div key={series.id} className={styles.moviecard}>
                    <img
                      src={makeImagePath(series.poster_path, "w500")}
                      alt={series.name}
                    />
                    <h3>{series.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


