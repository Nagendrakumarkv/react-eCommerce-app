import React, { useState } from "react";
import "./newProductFormInput.css";

const NewProductFormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="newProductItem">
      <label>{label}</label>
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

export default NewProductFormInput;
