import React, { useState } from "react";
import styled from "styled-components";
import "./RegisterFormInput.css";

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;
const Span = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`;

const RegisteerFormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <FormInput>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <Span>{errorMessage}</Span>
    </FormInput>
  );
};

export default RegisteerFormInput;
