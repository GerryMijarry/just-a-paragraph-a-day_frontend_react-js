import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

const paragraphURL =
  "https://xdhylrg4nh.execute-api.us-east-1.amazonaws.com/prod/books";

const Paragraphs = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [sentence1, setSentence1] = useState("");
  const [sentence2, setSentence2] = useState("");
  const [sentence3, setSentence3] = useState("");
  const [sentence4, setSentence4] = useState("");
  const [sentence5, setSentence5] = useState("");
  const [sentence6, setSentence6] = useState("");
  const [sentence7, setSentence7] = useState("");
  const [sentence8, setSentence8] = useState("");
  const [sentence9, setSentence9] = useState("");
  const [sentence10, setSentence10] = useState("");

  
  

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
      .get(paragraphURL, requestBody, requestConfig)
      .then((response) => {
        
      })
      .catch(() => {});
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      book.trim() === "" ||
      description.trim() === "" ||
      sentence1.trim() === "" ||
      sentence2.trim() === "" ||
      sentence3.trim() === ""

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
      book: book,
      description: description,
      
    };
    axios
      .post(paragraphURL, requestBody, requestConfig)
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
        <h5>Add a paragraph:</h5>
        Which book project?:
        <input
          type="text"
          value={book}
          onChange={(event) => setBook(event.target.value)}
        />
        <br />
        Which book chapter?:
        <input
          type="number"
          value={chapter}
          min="1" max="200"
          onChange={(event) => setChapter(event.target.value)}
        />
        <br />
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        Sentence 1:
        <input
          type="text"
          value={sentence1}
          onChange={(event) => setSentence1(event.target.value)}
        />
        <br />
        Sentence 2:
        <input
          type="text"
          value={sentence2}
          onChange={(event) => setSentence2(event.target.value)}
        />
        <br />
        Sentence 3:
        <input
          type="text"
          value={sentence3}
          onChange={(event) => setSentence3(event.target.value)}
        />
        <br />
        Sentence 4:
        <input
          type="text"
          value={sentence4}
          onChange={(event) => setSentence4(event.target.value)}
        />
        <br />
        Sentence 5:
        <input
          type="text"
          value={sentence5}
          onChange={(event) => setSentence5(event.target.value)}
        />
        <br />
        Sentence 6:
        <input
          type="text"
          value={sentence6}
          onChange={(event) => setSentence6(event.target.value)}
        />
        <br />
        Sentence 7:
        <input
          type="text"
          value={sentence7}
          onChange={(event) => setSentence7(event.target.value)}
        />
        <br />
        Sentence 8:
        <input
          type="text"
          value={sentence8}
          onChange={(event) => setSentence8(event.target.value)}
        />
        <br />
        Sentence 9:
        <input
          type="text"
          value={sentence9}
          onChange={(event) => setSentence9(event.target.value)}
        />
        <br />
        Sentence 10:
        <input
          type="text"
          value={sentence10}
          onChange={(event) => setSentence10(event.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Add Paragraph" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Paragraphs;
