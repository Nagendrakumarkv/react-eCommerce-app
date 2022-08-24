import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import RegisteerFormInput from "./RegisterFormInput/RegisterFormInput";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [disableCreateButton, setDisableCreateButton] = useState(false);

  const registeredUser = useSelector((state) => state.user.registeredUser);

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Fullname*",
      errorMessage:
        "Full name should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Fullname",
      pattern: "[A-Za-z0-9 ]{3,25}$",
      required: true,
    },
    {
      id: 2,
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
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email*",
      errorMessage: "enter a valid email",
      label: "Email",
      required: true,
    },
    {
      id: 4,
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
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password*",
      errorMessage: "Password not match",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "address",
      type: "text",
      placeholder: "Address*",
      errorMessage: "Adrress should be alteast 3-16 charecter",
      label: "Address",
      pattern: `[A-Za-z0-9#]{3,16}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //DISABLED THE CREATE BUTTON BASED ON EMPTY FIELDS AND LENGTH OF INPUT VALUE
  useEffect(() => {
    if (
      values.fullname === "" ||
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.confirmPassword === "" ||
      values.address === "" ||
      values.fullname.length < 3 ||
      values.fullname.length > 25 ||
      values.username.length < 3 ||
      values.username.length > 16 ||
      values.password.length < 8 ||
      values.password.length > 16 ||
      values.confirmPassword.length < 8 ||
      values.confirmPassword.length > 16 ||
      values.address.length < 3 ||
      values.address.length > 16
    ) {
      setDisableCreateButton(true);
    } else {
      setDisableCreateButton(false);
    }
  }, [values]);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, values);
    if (registeredUser) {
      navigate("/login");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {inputs.map((input) => (
            <RegisteerFormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={disableCreateButton}>
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
