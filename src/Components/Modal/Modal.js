import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./Modal.css";

export const Modal = ({ id, name, blank, lines, handleCloseModal }) => {
  const [text, setText] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [newImg, setNewImg] = useState("");

  const handleChange = (e) => {
    const currentInput = e.target.attributes.getNamedItem("data-index")?.value;

    if (currentInput) {
      setText((prevState) => ({
        ...prevState,
        [currentInput]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const layers = Object.values(text);
    let newImg = `https://api.memegen.link/images/${id}/`;

    layers.forEach((value, i) => {
      const isLast = layers.length - 1 === i;
      if (isLast) {
        newImg += encodeURIComponent(`${value}.png`);
        return;
      }
      newImg += encodeURIComponent(`${value}/`);
    });

    setNewImg(newImg);
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const arrayOfLines = Array.from(Array(lines).keys());

  const downloadImg = () => {
    saveAs(newImg, "Meme.png");
  };

  return (
    <div className="modal">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          {arrayOfLines.map((line, i) => {
            return (
              <input
                key={line}
                type="text"
                placeholder="Add text..."
                data-index={i}
                onChange={handleChange}
                title="generate new text"
              />
            );
          })}
          <button className="btn btn-secondary ModalBtn" type="submit">
            Generate Meme
          </button>
        </form>
        {isLoading && (
          <strong className="loading-statement primary-gradient">
            Generating Meme...
          </strong>
        )}
        <img
          src={newImg || blank}
          alt={name}
          className={"newImg"}
          onLoad={handleImageLoaded}
          onClick={downloadImg}
        />
        <button className={"saveImg"} onClick={downloadImg}>
          Save Meme
        </button>

        <button className="modal-btn" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};
