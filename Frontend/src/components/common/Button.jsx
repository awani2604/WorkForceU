import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer border-2 select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-[4px] gap-1.5 shadow-brutal-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
    md: "text-sm px-4 py-2 rounded-[4px] gap-2 shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    lg: "text-base px-5 py-2.5 rounded-[4px] gap-2.5 shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  };

  const variantStyles = {
    primary: "bg-[#141821] text-white border-[#141821] hover:bg-[#222834]",
    rust: "bg-[#C1502E] text-white border-[#141821] hover:bg-[#A74123]",
    blue: "bg-[#2E6FB0] text-white border-[#141821] hover:bg-[#24588D]",
    teal: "bg-[#1D8C6C] text-white border-[#141821] hover:bg-[#167056]",
    purple: "bg-[#7C6BC4] text-white border-[#141821] hover:bg-[#6755B1]",
    outline: "bg-white text-[#141821] border-[#141821] hover:bg-[#F7F4EA]",
    secondary: "bg-[#F7F4EA] text-[#141821] border-[#141821] hover:bg-white",
    ghost: "bg-transparent text-[#141821] border-transparent hover:bg-black/5 shadow-none active:translate-none",
    danger: "bg-red-600 text-white border-[#141821] hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      {children}
    </button>
  );
};
