import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/store/useFavorites";
import CollectIcon from "@/assets/CollectIcon.svg";
import CollectedIcon from "@/assets/CollectedIcon.svg";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorited } = useFavorites();
  const goToDetail = (id) => {
    navigate(`/movie/${id}`);
  };

  if (!movies?.length) return <p className="text-white mt-6">找不到電影</p>;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-white mt-6 px-12">
      {movies.map((movie) => (
        <li
          key={movie.imdbID}
          className="group pb-3 cursor-pointer transition duration-300 
                    hover:shadow-[0_0_30px_#ffffff80] overflow-hidden hover:bg-[#E0E0D9]"
          onClick={() => goToDetail(movie.imdbID)}
        >
          <div className="relative">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded"
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
                className="w-8 h-8"
              />
            </button>
          </div>
          <div className="flex flex-col items-start">
            <p className="mt-2 border rounded p-1 inline-block text-xs group-hover:text-black/50 group-hover:border-black/50">
              {movie.Type}
            </p>
            <p className="mt-2 font-semibold text-left group-hover:text-black">
              {movie.Title}
            </p>
            <p className="text-sm text-gray-400 group-hover:text-black/50">
              {movie.Year}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
