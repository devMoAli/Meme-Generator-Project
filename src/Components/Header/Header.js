import React from "react";
import smudge from "../../images/smudge.png";

import "./Header.css";

const Header = () => {
  return (
    <header className="headerContainer">
      <div className="container">
        <img className="headerImg" src={smudge} alt={"meme"} />
        <h1 className="headerTitle">Meme Generator</h1>{" "}
      </div>
      <div className="conatctDetails">
        <a href="https://github.com/devMoAli">Contact 📧 dev.Mohamed Ali </a>
      </div>
    </header>
  );
};
export default Header;
