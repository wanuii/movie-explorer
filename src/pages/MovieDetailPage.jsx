import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "react-rating";
import { useFavorites } from "@/store/useFavorites";
import { getMovieById } from "@/api/movie";
import CollectIcon from "@/assets/CollectIcon.svg";
import CollectedIcon from "@/assets/CollectedIcon.svg";
import PageStatus from "@/components/PageStatus";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorited } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        setMovie(res.data);
      } catch (err) {
        setError(err, "取得電影資料失敗");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  return (
    <PageStatus loading={loading} error={error} data={movie}>
      {movie && (
        <div className="relative text-white sm:mt-10 px-6 pb-10 sm:px-12 md:px-24 lg:px-48">
          <div className="block sm:hidden mb-5">
            <h1 className="text-2xl font-bold mb-2 block sm:hidden">
              {movie?.Title}
            </h1>
            <div className="relative">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="w-full h-auto rounded"
              />
              <button
                className="absolute bottom-1 right-1 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(movie);
                }}
              >
                <img
                  src={isFavorited(movie.imdbID) ? CollectedIcon : CollectIcon}
                  alt="收藏"
                  className="w-10 h-10"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="relative z-10 flex flex-col gap-2 xl:pr-[420px]">
              <div className="gap-2 items-center hidden sm:flex">
                <button onClick={() => toggleFavorite({ imdbID: id })}>
                  <img
                    src={isFavorited(id) ? CollectedIcon : CollectIcon}
                    alt="收藏"
                    className="w-8 h-8"
                  />
                </button>
                <h1 className="text-2xl font-bold">{movie.Title}</h1>
              </div>
              <p className="text-gray-300">{movie.Rated}</p>
              <p className="text-gray-300">
                {movie.Released} • {movie.Runtime} • 語言：{movie.Language}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                <div className="flex whitespace-nowrap">
                  <Rating
                    initialRating={movie.imdbRating / 2}
                    readonly
                    fullSymbol={
                      <i className="ri-star-fill text-yellow-400 text-xl" />
                    }
                    halfSymbol={
                      <i className="ri-star-half-line text-yellow-400 text-xl" />
                    }
                    emptySymbol={
                      <i className="ri-star-line text-yellow-400 text-xl" />
                    }
                  />
                </div>
                <p>
                  IMDb 評分：{movie.imdbRating} / 10 • 共 {movie.imdbVotes}{" "}
                  人評分
                </p>
              </div>
              <p className="text-gray-300">導演：{movie.Director}</p>
              <p className="text-gray-300">
                主演：
                {movie.Actors?.split(",").map((actor, i) => (
                  <span key={i} className="mr-1">
                    {actor.trim()}
                  </span>
                ))}
              </p>
              <div>
                <p className="font-semibold text-xl mt-4">電影簡介</p>
                <p>{movie.Plot}</p>
              </div>
            </div>
            <div className="hidden sm:block absolute lg:right-40 right-24 w-[30vw] h-[25vw] z-0">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1E1E1E] opacity-100 rounded" />
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      )}
    </PageStatus>
  );
};

export default MovieDetailPage;
