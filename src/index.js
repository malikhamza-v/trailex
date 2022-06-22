import React from "react";
import ReactDOM from "react-dom/client";
import "./Styling/index.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner.js";
import CompleteRows from "./Components/CompleteRows.js";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Banner />
      <CompleteRows />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
