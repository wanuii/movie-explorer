import axios from "axios";

const isProd = import.meta.env.MODE === "production";

const OMDB_BASE = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const searchMovies = (keyword, page) => {
  return axios.get(isProd ? "/api/search-movies" : OMDB_BASE, {
    params: isProd
      ? { q: keyword, page }
      : { apikey: API_KEY, s: keyword, page },
  });
};

export const getMovieById = (id) => {
  return axios.get(isProd ? "/api/movie-detail" : OMDB_BASE, {
    params: isProd
      ? { id }
      : { apikey: API_KEY, i: id },
  });
};
