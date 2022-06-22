import React, { useState, useEffect } from "react";
import "../Styling/row.css";
import YouTube from "react-youtube";
import axios from "../Module/axios.js";
import movieTrailer from "movie-trailer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Row({ title, fetchURL, isLargeRow, changeState, id }) {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log(movies);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row__heading">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id}>
            <LazyLoadImage
              className={`row__poster ${isLargeRow && "row__posterlarge"}`}
              effect="blur"
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            />
            <div className="row__rating">
              <span>{movie.vote_average}</span>
            </div>
          </div>
        ))}
      </div>

      {trailerUrl && (
        <YouTube className="row__video" videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
}

export default Row;
