import React, { Suspense, lazy } from "react";
import request from "../Module/requests";
const Row = lazy(() => import("../Components/Row.js"));
function CompleteRows() {
  return (
    <div>
      <Row title="Top Rated" fetchURL={request.topRated} isLargeRow />
      <Row title="Action Movies" fetchURL={request.actionMovies} />
      <Row title="Comedy Movies" fetchURL={request.comedyMovies} />
      <Suspense>
        <Row title="Animated Movies" fetchURL={request.animatedMovies} />
        <Row title="Family Movies" fetchURL={request.familyMovies} />
        <Row title="Horror Movies" fetchURL={request.horrorMovies} />
        <Row title="Documentary" fetchURL={request.documentary} />
      </Suspense>
    </div>
  );
}

export default CompleteRows;
