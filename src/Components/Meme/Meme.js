import React, { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import "../Modal/Modal.css";

const Meme = () => {
  const [memes, setMemes] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState({
    id: "",
    name: "",
    blank: "",
    lines: 1,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isModalOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    fetch("https://api.memegen.link/templates")
      .then((data) => data.json())
      .then((res) => {
        setMemes(res);
      });
  }, []);

  const handleOpenModal = ({ id, name, blank, lines }) => {
    setCurrentModal({ id, name, blank, lines });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setCurrentModal({ id: "", name: "", blank: "", lines: 1 });
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <section className="memes">
        {isModalOpen && currentModal.id && (
          <Modal
            onClick={toggleModal}
            id={currentModal.id}
            name={currentModal.name}
            blank={currentModal.blank}
            lines={currentModal.lines}
            handleCloseModal={handleCloseModal}
          />
        )}
        {memes?.map((meme) => {
          return (
            <div key={meme.id} className="card">
              <img src={meme.blank} alt={meme.name} loading="lazy" />
              <p>{meme.name}</p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={({ toggleModal }) =>
                  handleOpenModal({
                    id: meme.id,
                    name: meme.name,
                    blank: meme.blank,
                    lines: meme.lines,
                  })
                }
              >
                Generate
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Meme;
