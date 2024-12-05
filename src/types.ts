export interface IResults {
  page: number;
  results: IMovieData[];
  total_pages: number;
  total_results: number;
}

export interface ITrailerResults {
  id: number;
  results: ITrailer[];
}

export interface IReviewResults {
  id: number;
  page: number;
  results: IReview[];
  total_pages: number;
  total_results: number;
}

export interface IMovieData {
  adult: string;
  backdrop_path: string;
  budget: string;
  genres: IGenre[];
  homepage?: string;
  id: string;
  imdb_id?: string;
  origin_country?: string;
  original_language?: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  production_companies?: string;
  production_countries?: string;
  release_date: string;
  revenue?: string;
  runtime: string;
  spoken_languages?: string;
  status: string;
  tagline: string;
  title: string;
  vote_average: string;
  vote_count: string;
}

interface IGenre {
  id: number;
  name: string;
}

export interface ITrailer {
  iso_639_1?: string;
  iso_3166_1?: string;
  name: string;
  trailerKey?: string;
  key: string;
  site?: string;
  size?: string;
  type?: string;
  official?: string;
  published_at: string;
  id?: string;
}

interface IReview {
  author: string;
  author_details: IReviewAuthor;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface IReviewAuthor {
  name: string;
  username: string;
  avatar_path?: string | null;
  rating: number;
}

export interface IUserReview {
  id: string;
  ratings: number;
  createdAt: string;
  likes: number;
  content: string;
}
