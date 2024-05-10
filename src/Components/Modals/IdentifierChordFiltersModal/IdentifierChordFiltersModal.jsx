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
        <p>□ Show notes</p>
        <p>□ Only show exact chords</p>
        <p>□ Show chords that are 1 note off</p>
        <p>□ Show chords that are 2 note off</p>
        <p>□ Show all possible chords, closest first</p>
        -Intervals on/off + intervals style -Notes in chord -Aliases
      </div>
    </Modal>
  );
}

export default IdentifierChordFiltersModal;
