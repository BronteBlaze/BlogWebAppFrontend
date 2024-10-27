const Button = ({ title, className, type, divClass, onClick, disabled }) => {
  return (
    <div className={divClass}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${
          !disabled ? "bg-main-color" : "bg-gray-500"
        } px-10 py-2 uppercase text-white ${className}`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
