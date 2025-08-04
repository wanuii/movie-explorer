import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.imdbID !== id),
        })),
      isFavorited: (id) =>
        get().favorites.some((m) => m.imdbID === id),
      toggleFavorite: (movie) => {
        const { isFavorited, addFavorite, removeFavorite } = get();
        if (isFavorited(movie.imdbID)) {
          removeFavorite(movie.imdbID);
        } else {
          addFavorite(movie);
        }
      },
    }),
    {
      name: "movie-favorites", // localStorage key
    }
  )
);
