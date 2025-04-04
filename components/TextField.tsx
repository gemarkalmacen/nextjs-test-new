import React, { forwardRef } from "react";

type TextFieldStyles = {
  variant?: "bordered" | "filled" | "default";
  size?: "small" | "medium" | "large";
  color?: "dominant" | "accent" | "danger" | "success";
};

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  name?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  showPassword?: boolean;
  onToggleShowPassword?: () => void;
  styles?: TextFieldStyles;
  width?: string;
  readonly?: boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
}

// ✅ Use forwardRef to allow passing a ref from the parent
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      placeholder = "",
      value = "",
      type = "text",
      name,
      error,
      onChange,
      className = "",
      icon,
      showPassword = false,
      onToggleShowPassword,
      styles,
      width,
      readonly = false,
      onKeyUp,
      required = false,
    },
    ref // ✅ Accept ref as a second argument
  ) => {
    const inputType = showPassword ? "text" : type;

    const getColorClasses = () => {
      switch (styles?.color) {
        case "dominant":
          return "border-2 border-blue-900 text-blue-900 hover:bg-gray-100";
        case "accent":
          return "border-2 border-gray-500 text-gray-500 hover:bg-gray-100";
        case "danger":
          return "border-2 border-red-500 text-red-500 hover:bg-red-100";
        case "success":
          return "border-2 border-green-500 text-green-500 hover:bg-green-100";
        default:
          return "text-gray-900 border-gray-300 focus:ring-gray-500";
      }
    };

    const getVariantClasses = () => {
      switch (styles?.variant) {
        case "filled":
          return "bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500";
        case "bordered":
          return "bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500";
        case "default":
        default:
          return "bg-white border border-gray-300 focus:ring-red-500 focus:border-blue-500";
      }
    };

    const getSizeClasses = () => {
      switch (styles?.size) {
        case "small":
          return "text-sm px-2 py-1";
        case "large":
          return "text-lg px-6 py-3";
        case "medium":
        default:
          return "text-base px-4 py-2";
      }
    };

    const getWidthClasses = () => {
      switch (width) {
        case "standard":
          return "w-[200px]";
        case "long":
          return "w-[350px]";
        default:
          return "w-full";
      }
    };

    return (
      <div>
        {label && (
          <label htmlFor={name} className="block text-xs text-gray-500 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className={`relative ${getWidthClasses()} ${className}`}>
          <input
            ref={ref} // ✅ Attach the ref to the input element
            type={inputType}
            name={name}
            id={name}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
            onChange={onChange}
            onKeyUp={onKeyUp}
            className={`block w-full font-medium !text-gray-600 ${getVariantClasses()} ${getSizeClasses()} ${getColorClasses()} ${className}
              rounded-md shadow-sm focus:outline-none
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
          />
          {icon && (
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={onToggleShowPassword}
            >
              {icon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField"; // ✅ Required for debugging with forwardRef

export default TextField;
