import "./KeyChangeNote.scss";

function KeyChangeNote({ label, onClick }) {
  return (
    <button className="keyChangeNote" onClick={onClick}>
      {label}
    </button>
  );
}

export default KeyChangeNote;
