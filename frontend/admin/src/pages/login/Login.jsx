import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormInput from "./LoginFormInput";
import { useEffect } from "react";
import { login } from "../../redux/apiCalls";
import "./login.css";

const Login = () => {
  const { isFetching } = useSelector((state) => state.user);

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
    <div className="Container">
      <div className="Wrapper">
        <h1 className="Title">SIGN IN</h1>
        <form className="Form">
          {inputs.map((input) => (
            <LoginFormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button
            className="Button"
            onClick={handleClick}
            disabled={isFetching || disableCreateButton}
          >
            LOGIN
          </button>
          <button className="ForgotPasswordButton">
            DO NOT YOU REMEMBER THE PASSWORD?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
