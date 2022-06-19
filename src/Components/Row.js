import React, { useState, useEffect } from "react";
import "../Styling/row.css";
import axios from "../Module/axios.js";

function Row({ title, fetchURL, isLargeRow }) {
  const base_url = "http://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <h2 className="row__heading">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) =>
          movie.poster_path == null || movie.backdrop_path == null ? (
            false
          ) : (
            <img
              loading="lazy"
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterlarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Row;
