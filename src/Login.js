import React, { useState } from "react";
import { setUserSession } from "./service/AuthService";
import axios from "axios";

const loginUrl =
  "https://xdhylrg4nh.execute-api.us-east-1.amazonaws.com/prod/login";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("All fields are required");
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": "u8NeUf6akQaClOW3IkTdx5fU7IDaCjRJ4fy54edB",
      },
    };

    const requestBody = {
      username: username,
      password: password,
    };
    axios
      .post(loginUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        props.history.push("/profile");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "Sorry the server may be unavailable. Please try again later"
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" value="login" />
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
