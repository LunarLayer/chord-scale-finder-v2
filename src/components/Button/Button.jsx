import "./Button.scss";

function Button({ onClick, children, className, active }) {
  return (
    <button
      className={`button ${className} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
