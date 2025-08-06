import { useEffect, useState } from "react";
import { useFavorites } from "@/store/useFavorites";
import { getMovieById } from "@/api/movie";
import PageStatus from "@/components/PageStatus";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

const itemsPerPage = 30;

const FavoriteMovieList = () => {
  const { favorites } = useFavorites(); // 假設收藏陣列是完整資料（不是只有 id）

  const totalResults = favorites.length;
  const [allMovies, setAllMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!favorites.length) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await Promise.all(
          favorites.map((f) => getMovieById(f.imdbID)) // ✅ 直接 map imdbID
        );
        const valid = results
          .map((res) => res.data)
          .filter((m) => m.Response === "True");

        setAllMovies(valid);
        setCurrentPage(1);
      } catch (err) {
        setError(err, "取得收藏資料失敗");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setVisibleMovies(allMovies.slice(start, start + itemsPerPage));
  }, [allMovies, currentPage]);

  const totalPages = Math.ceil(allMovies.length / itemsPerPage);

  return (
    <>
      <PageStatus
        loading={loading}
        error={error}
        data={visibleMovies}
        noDataMessage="找不到電影"
      >
        <MovieList movies={visibleMovies} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          onPageChange={setCurrentPage}
        />
      </PageStatus>
    </>
  );
};

export default FavoriteMovieList;
