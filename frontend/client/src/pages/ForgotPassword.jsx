import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { forgotPassword } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordFormInput from "./ForgotPassword/ForgotPasswordFormInput";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://th.bing.com/th/id/OIP.dsfvgz-7Driq5cpUEOBXxwHaE7?w=249&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7")
      center; */
  background-color: lightgrey;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-left: 90px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 70px;
  margin-bottom: 10px;
  margin-top: 20px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const ForgotPassword = () => {
  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [disableCreateButton, setDisableCreateButton] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username*",
      errorMessage:
        "Username should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Username",
      pattern: "[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password*",
      errorMessage:
        "Password should be 8-20 charecter and atleast 1 char,1 number,1 spacial charecter",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password*",
      errorMessage: "Password doesn't match",
      label: "Password",
      pattern: values.password,
      required: true,
    },
  ];

  //DISABLED THE CREATE BUTTON BASED ON EMPTY FIELDS AND LENGTH OF INPUT VALUE
  useEffect(() => {
    if (
      values.username === "" ||
      values.password === "" ||
      values.confirmPassword === "" ||
      values.username.length < 3 ||
      values.username.length > 16 ||
      values.password.length < 8 ||
      values.password.length > 16 ||
      values.confirmPassword.length < 8 ||
      values.confirmPassword.length > 16
    ) {
      setDisableCreateButton(true);
    } else {
      setDisableCreateButton(false);
    }
  }, [values]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const forgotPasswordFunc = (e) => {
    e.preventDefault();
    forgotPassword(dispatch, values);
    if (error) {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Form>
          {inputs.map((input) => (
            <ForgotPasswordFormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Button onClick={forgotPasswordFunc} disabled={disableCreateButton}>
            RESET PASSWORD
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
