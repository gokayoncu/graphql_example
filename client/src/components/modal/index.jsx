import React from "react";
import style from "./style.module.css";
import useStore from "../../store";
import { Link } from "react-router";
function Modal() {
  const closeModal = useStore((state) => state.closeModal);
  const {
    modal: { data },
  } = useStore();

  const renderTitle = (title) => {
    if (title.length > 30) {
      return title.slice(0, 30) + "...";
    }
    return title;
  };
  return (
    <div className={style.content}>
      <div className={style.modal}>
      <span className={style.closeButton} onClick={closeModal}>X</span>
        <div className={style.detail}>
          {data.map((item) => (
            <div key={item.id} className={style.cards}>
              <h3>{renderTitle(item.title)}</h3>
              <span>Date: {item.date}</span>
              <span>
                Time: {item.from} - {item.to}
              </span>
              <Link to={`/event/${item.id}`} className={style.button} onClick={closeModal} >View Details</Link>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
