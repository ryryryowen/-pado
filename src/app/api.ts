const API_KEY = "614428ff400eba97e5092d23db62b6bd";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "ko"; // 한국어 설정

export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adult: boolean;
  name: string;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const searchContents = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const searchGeneres = () => {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getReviews = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/reviews?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getVideos = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};
