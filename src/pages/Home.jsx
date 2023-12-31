import { useState } from "react";
import { tvMazeApi_Base_Url } from "../tvMazeApi";
import { useFetch } from "../hook/useFetch";
import SearchBar from "../components/SearchBar";
import Skeletons from "../components/Skeletons";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [search, setSearch] = useState("");

  let url = tvMazeApi_Base_Url + "shows";
  if (search) {
    url = tvMazeApi_Base_Url + "search/shows?q=" + search;
  }

  const { data: movies, isLoading, error } = useFetch(url);

  const handleSearch = (term) => {
    setSearch(term);
  };

  const renderMovies = movies.map((movie) => {
    return (
      <MovieCard key={movie.id || movie.show.id} show={movie.show || movie} />
    );
  });

  return (
    <div className="container">
      <h1 className="heading">MovieLand</h1>
      <header>
        <SearchBar handleSearch={handleSearch} />
      </header>

      <main>
        <div className="movies_container">
          {isLoading ? <Skeletons times={10} /> : renderMovies}
        </div>
      </main>
    </div>
  );
};
export default Home;
