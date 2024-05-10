import { useEffect, useRef, useState } from "react";

import "./Collapsible.scss";

import {
  FilterIcon,
  HollowArrowRight,
  HollowArrowDown,
} from "../../../public/svgs/SvgIcons";
import { useDispatch } from "react-redux";
import { showModal } from "../../Features/UI/UISlice";

function Collapsible({ title, settingsModal, children }) {
  const dispatch = useDispatch();
  const [collapsibleIsOpen, setCollapsibleIsOpen] = useState(false);
  const [collapsibleIcon, setCollapsibleIcon] = useState(HollowArrowRight);
  const contentRef = useRef(null);

  // useEffect(() => {
  //   const contentElem = contentRef.current;
  //   if (collapsibleIsOpen) {
  //     // set max height back to 0
  //     contentElem.style.maxHeight = contentElem.scrollHeight + "px";
  //     setCollapsibleIcon(HollowArrowDown);
  //   } else {
  //     contentElem.style.maxHeight = 0;
  //     setCollapsibleIcon(HollowArrowRight);
  //     // set max height
  //   }
  // }, [collapsibleIsOpen]);

  function handleClick(e) {
    console.log(e.target);

    if (e.target.closest(".settingsButton")) {
      dispatch(showModal(settingsModal));
    } else {
      setCollapsibleIsOpen(!collapsibleIsOpen);
    }
  }

  return (
    <div className={`collapsible ${collapsibleIsOpen ? "open" : "closed"}`}>
      <div className="collapsibleHeader" onClick={(e) => handleClick(e)}>
        {collapsibleIcon}
        <p className="title">{title}</p>
        {settingsModal && (
          <button className="settingsButton">
            <FilterIcon />
          </button>
        )}
      </div>
      <div ref={contentRef} className="content">
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
