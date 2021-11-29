import React from "react";
import { getUser, resetUserSession } from "./service/AuthService";

const Books = (props) => {
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";

  const logoutHandler = () => {
    resetUserSession();
    props.history.push("/login");
  };

  return (
    <div>
      Hello {name}! Below are your current writing projects: &nbsp;
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  );
};

export default Books;
