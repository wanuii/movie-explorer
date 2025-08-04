import { useEffect, useState } from "react";
import { searchMovies } from "@/api/movie";
import PageStatus from "@/components/PageStatus";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

const SearchMovieList = ({ keyword }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword.trim()) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const pages = [
          (currentPage - 1) * 3 + 1,
          (currentPage - 1) * 3 + 2,
          (currentPage - 1) * 3 + 3,
        ];

        const results = await Promise.all(
          pages.map((page) => searchMovies(keyword, page))
        );

        const merged = results.flatMap((res) => res.data.Search || []);
        const total = Number(results[0]?.data?.totalResults || 0);

        setMovies(merged);
        setTotalResults(total);
      } catch (err) {
        setError(err, "載入失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, currentPage]);

  const totalPages = Math.ceil(totalResults / 30);

  return (
    <>
      <PageStatus loading={loading} error={error} data={movies}>
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      </PageStatus>
    </>
  );
};

export default SearchMovieList;
