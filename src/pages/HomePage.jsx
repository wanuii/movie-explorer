import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoritesIcon from "@/assets/FavoritesIcon.svg";
import SearchMovieList from "@/components/SearchMovieList";
const HomePage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("cat");

  const handleSearch = () => {
    setSearchKeyword(searchInput);
  };
  const goToFavorites = () => {
    navigate("/favorites");
  };
  return (
    <>
      <div className="flex justify-center gap-3">
        <div className="flex">
          <input
            type="text"
            placeholder="搜尋"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-black text-white px-4 py-2 outline-none rounded-l-md w-96"
          />
          <button
            onClick={handleSearch}
            className="bg-[#405DA7] px-3 flex items-center justify-center rounded-r-md"
          >
            <i className="ri-search-line text-white text-2xl"></i>
          </button>
        </div>
        <button
          className="bg-[#405DA7] p-2 flex items-center justify-center rounded-md gap-1"
          onClick={goToFavorites}
        >
          <img
            src={FavoritesIcon}
            alt="icon"
            className="h-6 w-6 cursor-pointer"
          />
          <p className="text-white">我的收藏</p>
        </button>
      </div>
      <div>
        <SearchMovieList keyword={searchKeyword} />
      </div>
    </>
  );
};

export default HomePage;
