import React, { useState, useEffect } from "react";
import {
  getToken,
  getUser,
  resetUserSession,
  setUserSession,
} from "./service/AuthService";
import axios from "axios";

const MyProfile = (props) => {
  const profileURL =
    "https://xdhylrg4nh.execute-api.us-east-1.amazonaws.com/prod/profile";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [penname, setPenname] = useState("");
  const [message, setMessage] = useState(null);

  const user = getUser();

  setName(user.name);

  const logoutHandler = () => {
    resetUserSession();
    props.history.push("/login");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      username.trim() === "" ||
      penname.trim() === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": "u8NeUf6akQaClOW3IkTdx5fU7IDaCjRJ4fy54edB",
      },
    };

    const requestBody = {
      token: getToken(),
      username: username,
      email: email,
      name: name,
      penname: penname,
    };
    axios
      .post(profileURL, requestBody, requestConfig)
      .then((response) => {
        setMessage("Update Successful");
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
      Hello {name}! You can update your profile below: &nbsp;
      <input type="button" value="Logout" onClick={logoutHandler} />
      <br />
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        Full Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        E-mail:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Pen Name:
        <input
          type="text"
          value={penname}
          onChange={(event) => setPenname(event.target.value)}
        />
        <br />
        <input type="submit" value="register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MyProfile;
