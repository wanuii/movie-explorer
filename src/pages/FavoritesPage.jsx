import FavoriteMovieList from "@/components/FavoriteMovieList";

const FavoritesPage = () => {
  return (
    <div className="flex flex-col text-center">
      <h2 className="text-white text-xl py-5">我的收藏</h2>
      <FavoriteMovieList />
    </div>
  );
};

export default FavoritesPage;
