import React, { useState, useEffect } from "react";
import "../Styling/row.css";
import YouTube from "react-youtube";
import axios from "../Module/axios.js";
import movieTrailer from "movie-trailer";
import Imgix from "react-imgix";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/attrchange/ls.attrchange";

// Note: Never import/require the *.min.js files from the npm package.

function Row({ title, fetchURL, isLargeRow }) {
  const base_url = "http://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);

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
        {movies.map((movie) =>
          movie.poster_path == null || movie.backdrop_path == null ? (
            false
          ) : (
            // <img
            //   onClick={() => handleClick(movie)}
            //   key={movie.id}
            //   className={`row__poster ${isLargeRow && "row__posterlarge"}`}
            //   src={`${base_url}${
            //     isLargeRow ? movie.poster_path : movie.backdrop_path
            //   }`}
            //   alt={movie.title}
            // />

            // <button onClick={() => handleClick(movie)}>

            <Imgix
              // htmlAttributes={(onClick = handleClick(movie))}
              // htmlAttributes=onClick={() => handleClick(movie)}
              htmlAttributes={{ onClick: () => handleClick(movie) }}
              className={`row__poster ${isLargeRow && "row__posterlarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              key={movie.id}
              imgixParams={{ auto: "compress,format" }}
              // onClick={() => handleClick(movie)}
            />

            // </button>

            // <Imgix
            //   className={`row__poster lazyload ${
            //     isLargeRow && "row__posterlarge"
            //   }`}
            //   src={`${base_url}${
            //     isLargeRow ? movie.poster_path : movie.backdrop_path
            //   }`}
            //   imgixParams={{ auto: "compress,format" }}
            // sizes="auto"
            // attributeConfig={{
            //   src: "data-src",
            //   srcSet: "data-srcset",
            //   sizes: "data-sizes",
            // }}
            // htmlAttributes={{
            //   // alt: movie.title,
            //   // alt={movie.title}, // low quality image here
            //   src: `${base_url}${
            //     isLargeRow
            //       ? movie.poster_path + "?w=10&auto=format,compress"
            //       : movie.backdrop_path + "?w=10&auto=format,compress"
            //   }`,
            // }}
            // />
            // {/* </div> */}
          )
        )}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
