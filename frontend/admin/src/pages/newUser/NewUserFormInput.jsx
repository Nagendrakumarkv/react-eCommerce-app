import React, { useState } from "react";

const NewUserFormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="newUserItem">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="Span">{errorMessage}</span>
    </div>
  );
};

export default NewUserFormInput;
