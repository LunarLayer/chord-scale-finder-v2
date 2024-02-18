import { useCallback, useEffect, useState } from "react";
import "./Modal.scss";

function Modal({ id, title, onClose, children }) {
  // const [transparentShadow, setTransparentShadow] = useState(true);
  const closeModal = useCallback(() => {
    let modal = document.querySelector(".modal");
    modal.classList.add("fadeOut");
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    let modal = document.querySelector(".modal");
    const handleClickOutsideModal = (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };
    modal.addEventListener("click", handleClickOutsideModal);
    return () => {
      modal.removeEventListener("click", handleClickOutsideModal);
    };
  }, [closeModal]);

  return (
    <div id={id} className={`modal`}>
      <div className="contentWindow">
        <div className="windowHeader">
          {/* <button>↩</button> */}
          <button onClick={() => closeModal()}>✓</button>
          <h4>{title}</h4>
          <button onClick={() => closeModal()}>✖</button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
