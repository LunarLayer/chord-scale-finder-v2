import { useDispatch } from "react-redux";
import { closeModal } from "../../../Features/UI/UISlice";
import Modal from "../Modal";

function IdentifierChordFiltersModal() {
  const dispatch = useDispatch();

  return (
    <Modal
      id="IdentifierChordFiltersModal"
      title="Chord layout"
      onClose={() => dispatch(closeModal())}
    >
      <div className="identifierChordFilters">
        -Intervals on/off + intervals style -Notes in chord -Aliases
      </div>
    </Modal>
  );
}

export default IdentifierChordFiltersModal;
