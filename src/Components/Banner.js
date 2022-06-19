import React, { useState, useEffect } from "react";
import "../Styling/banner.css";
import axios from "../Module/axios";
import requests from "../Module/requests";

function Banner() {
  const [movie, setMovie] = useState([]);
  const base_url = "http://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetch() {
      const request = await axios.get(requests.topRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetch();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h2 className="banner__title">{movie.title}</h2>
        <button className="banner__button">Play</button>
        <h2 className="banner__desc">{truncate(movie?.overview, 150)}</h2>
      </div>
      <div className="banner--fadebottom" />
    </header>
  );
}

export default Banner;
