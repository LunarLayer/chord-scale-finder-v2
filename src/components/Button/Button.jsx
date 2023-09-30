import "./Button.scss";

function Button({ onClick, children, className }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
