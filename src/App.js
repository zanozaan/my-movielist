import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isReloading, setIsReloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const reloadData = () => {
    setIsReloading(true);
    getMovieList()
      .then((result) => {
        setPopularMovies(result);
      })
      .finally(() => {
        setIsReloading(false);
      });
  };

  const PopularMovieList = () => {
    return (
      popularMovies &&
      popularMovies.map((movie, i) => {
        return (
          <div
            className="movie-card col-md-6 col-lg-3 m-2 rounded border shadow p-3 fw-bold"
            key={i}
          >
            <div className="movie-title fw-bolder">{movie.title}</div>
            <img
              className="img-fluid img-thumbnail"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="..."
            />
            <div className="">Release date: {movie.release_date}</div>
            <div className="">Rating: {movie.vote_average}</div>
          </div>
        );
      })
    );
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.length > 3) {
      search(searchQuery);
    }
  };

  const search = async (q) => {
    const query = await searchMovie(q);
    setPopularMovies(query.results);
  };

  return (
    <div className="App">
      <header className="App-header p-4">
        <h1 className="p-1 text-dark">My-Movies</h1>

        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control m-1 rounded-pill"
            type="search"
            placeholder="Lagi cari film apa?"
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>
        <button
          className="btn btn-dark mt-2"
          onClick={reloadData}
          disabled={isReloading}
        >
          {isReloading ? "Memuat ulang..." : "Muat Ulang"}
        </button>
      </header>
      <div className="container-sm text-center">
        <div className="row justify-content-center">
          <PopularMovieList />
        </div>
      </div>
    </div>
  );
};

export default App;
