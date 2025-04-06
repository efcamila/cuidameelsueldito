import React from "react";
import classNames from "classnames";
import { ReactNode } from "react";

const Button = ({
  children,
  className,
  size = "md",
  rounded = "md",
  icon,
  disabled,
  onClick,
  ariaLabel,
}) => {
  const validSizes = ["sm", "md", "lg"];
  const validRounded = ["none", "sm", "md", "lg", "xl", "2xl", "full"];

  if (!validSizes.includes(size)) {
    console.error(`Invalid size prop: ${size}. Valid values are: ${validSizes.join(', ')}.`);
    size = "md";
  }

  if (!validRounded.includes(rounded)) {
    console.error(`Invalid rounded prop: ${rounded}. Valid values are: ${validRounded.join(', ')}.`);
    rounded = "md";
  }

  const buttonClassName = classNames(
    "button", 
    {
      "h-10 w-10 rounded-md": icon,
      [`button-${size}`]: !icon,
      [`rounded-${rounded}`]: !icon,
      "primary-disabled": disabled && !className,
      "primary": !disabled && !className
    },
    className
  );


  return (
    <button
      className={buttonClassName}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;