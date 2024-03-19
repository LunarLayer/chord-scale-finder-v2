import { useState } from "react";
import { useSelector } from "react-redux";
import KeyChangeModal from "./KeyChangeModal/KeyChangeModal";
import IdentifierChordFiltersModal from "./IdentifierChordFiltersModal/IdentifierChordFiltersModal";

function ModalsManager() {
  const activeModal = useSelector((store) => store.ui.activeModal);

  if (activeModal === "keyChange") return <KeyChangeModal />;
  if (activeModal === "identifyChordFilters")
    return <IdentifierChordFiltersModal />;
  return null;
}

export default ModalsManager;
