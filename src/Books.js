import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

const bookURL =
  "https://xdhylrg4nh.execute-api.us-east-1.amazonaws.com/prod/books";

const Books = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dailyParagraphs, setDailyParagraphs] = useState("");

  const [books, setBooks] = useState([]);
  const [dailyReminder, setDailyReminder] = useState("");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "u8NeUf6akQaClOW3IkTdx5fU7IDaCjRJ4fy54edB",
      },
    };

    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .get(bookURL, requestBody, requestConfig)
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch(() => {});
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dailyParagraphs.trim() === "" ||
      dailyReminder.trim() === ""
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
      title: title,
      desciprtion: description,
      dailyParagraphs: dailyParagraphs,
      dailyReminder: dailyReminder,
    };
    axios
      .post(bookURL, requestBody, requestConfig)
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
        <h5>Add a book project:</h5>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        Target number of daily paragraphs to write:
        <input
          type="text"
          value={dailyParagraphs}
          onChange={(event) => setDailyParagraphs(event.target.value)}
        />
        <br />
        Do you want a daily Reminder?
        <input
          type="text"
          value={dailyReminder}
          onChange={(event) => dailyReminder(event.target.value)}
        />
        <br />
        <input type="submit" value="rAdd Book" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Books;
