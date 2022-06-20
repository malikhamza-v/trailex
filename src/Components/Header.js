import React, { useEffect, useState } from "react";
import "../Styling/header.css";
import logo from "../Assets/logo.png";

function Header() {
  const [show, handleShow] = useState([false]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <header>
      <div className={`header ${show && "header__black"}`}>
        <img className="header__logo" src={logo} alt="Trailex" />
      </div>
    </header>
  );
}

export default Header;
