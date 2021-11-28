import React, { useState } from "react";
import axios from "axios";

const registerUrl = "";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [penname, setPenname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      username.trim() === "" ||
      penname.trim() === "" ||
      penname.trim() === ""
    ) {
      setMessage("All fields are required");
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "",
      },
    };

    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    };
    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registration Successful");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "Sorry the server may be unavailable. Please try again later"
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        Full Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        E-mail:{" "}
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Pen Name:{" "}
        <input
          type="text"
          value={penname}
          onChange={(event) => setPenname(event.target.value)}
        />
        <br />
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" value="register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
