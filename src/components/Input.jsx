import BlogContext from "@/context/BlogContext";
import { forwardRef, useContext } from "react";

const Input = forwardRef(
  (
    {
      type,
      id,
      label,
      placeholder,
      bg,
      className,
      onChange,
      error,
      onFocus,
      inputClass,
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-sm font-medium whitespace-nowrap">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="w-full mt-2">
          <input
            ref={ref}
            type={type}
            id={id}
            name={id}
            className={`border ${
              error === true ? "border-red-color" : "border-gray-300"
            } h-11 w-full ${inputClass} p-3 ${bg && bg}`}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
          />
        </div>
      </div>
    );
  }
);

export default Input;
