import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import HomePage from "@/pages/HomePage";
import FavoritesPage from "@/pages/FavoritesPage";
import MovieDetailPage from "@/pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

export default router;
