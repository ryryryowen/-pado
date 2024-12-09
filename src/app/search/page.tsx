/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // 클라이언트 컴포넌트로 명시

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { GetMoviesResult } from "../api";
import { makeImagePath } from "../uitls";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <SearchContent />
    </ProtectedRoute>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("q");

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string | null>(""); // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState<
    GetMoviesResult["results"]
  >([]); // 검색 결과 상태 추가
  const [isSearch, setIsSearch] = useState(false); // 검색 상태를 관리하는 새로운 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태

  // 영화 검색 처리 함수
  const handleSearch = async () => {
    setSearchTerm(searchKeyword);
    if (searchTerm?.trim() === "") {
      setSearchResults([]); // 검색어가 없을 경우 결과를 초기화
      return;
    }

    setIsLoading(true); // 검색 시 로딩 상태로 변경
    setIsSearch(true); // 검색 상태로 변경

    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=614428ff400eba97e5092d23db62b6bd&language=ko&query=${searchTerm}&page=${currentPage}`
    );
    const searchData = await searchRes.json();
    console.log(searchData);

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
    router.back();
  };

  useEffect(() => {
    setSearchTerm(searchKeyword);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div>
      {isLoading ? (
        <p className={styles.loadIng}>로딩 중...</p>
      ) : (
        <div className={styles.container}>
          {/* 검색 결과 표시 */}
          {isSearch && searchResults.length > 0 && (
            <div className={styles.category}>
              <h2>검색 결과</h2>
              <div className={styles.movielist}>
                {searchResults.slice(0, 6).map((movie) => (
                  <div key={movie.id} className={styles.moviecard}>
                    <Link href={`/movie/${movie.id}`}>
                      <img
                        src={makeImagePath(movie.poster_path, "w500")}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                    </Link>
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
          {/* 인기 영화 카테고리
          {!isSearch && !isLoading && (
            <div className={styles.category}>
              <h2>인기 영화</h2>
              <div className={styles.movielist}>
                {popularMovies.map((movie) => (
                  <div key={movie.id} className={styles.moviecard}>
                    <Link href={`/movie/${movie.id}`}>
                      <img
                        src={makeImagePath(movie.poster_path, "w500")}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
