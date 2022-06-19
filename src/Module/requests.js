const API_Key = "246a4978ab5bb6de20a27c01a8b60d4c";

const requests = {
  topRated: `/movie/top_rated?api_key=${API_Key}&language=en-US`,

  actionMovies: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=35`,
  animatedMovies: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=16`,

  familyMovies: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=10751`,
  horrorMovies: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=27`,
  documentary: `/discover/movie?api_key=${API_Key}&language=en-US&with_genres=99`,
};

export default requests;
