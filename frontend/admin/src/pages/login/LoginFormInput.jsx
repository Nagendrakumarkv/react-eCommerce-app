import React, { useState } from "react";
import "./loginFormInput.css";

const LoginFormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="FormInput">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="Span">{errorMessage}</span>
    </div>
  );
};

export default LoginFormInput;
