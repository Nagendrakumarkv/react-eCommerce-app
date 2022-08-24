import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import LoginFormInput from "./LoginFormInput/LoginFormInput";
import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
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
  margin-bottom: 10px;
  margin-top: 20px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const ForgotPasswordButton = styled.button`
  margin: 5px -8px;
  font-size: 12px;
  text-align: left;
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background-color: white;
`;
const RegisterButton = styled.button`
  color: black;
  font-size: 12px;
  cursor: pointer;
  margin: 5px -6px;
  text-decoration: underline;
  border: none;
  background-color: white;
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [disableCreateButton, setDisableCreateButton] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
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
  ];

  //DISABLED THE CREATE BUTTON BASED ON EMPTY FIELDS AND LENGTH OF INPUT VALUE
  useEffect(() => {
    if (
      values.username === "" ||
      values.password === "" ||
      values.username.length < 3 ||
      values.username.length > 16 ||
      values.password.length < 8 ||
      values.password.length > 16
    ) {
      setDisableCreateButton(true);
    } else {
      setDisableCreateButton(false);
    }
  }, [values]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, values);
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          {inputs.map((input) => (
            <LoginFormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Button
            onClick={handleClick}
            disabled={isFetching || disableCreateButton}
          >
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <ForgotPasswordButton>
            DO NOT YOU REMEMBER THE PASSWORD?
          </ForgotPasswordButton>
          <Link to="/register">
            <RegisterButton>CREATE A NEW ACCOUNT</RegisterButton>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
