import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apikey, setApiKey] = useState(
    "AIzaSyDfjFnMf6sqQlB4eS7mZaGtms4kth-l58Q"
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setBook(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apikey}&maxResults=10`
      )
      .then((res) => {
        console.log(res.data.items);
        setResult(res.data.items);
      });
  };
  return (
    <div className="container">
      <h1>Book Search App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleInputChange}
            className="form-control mt-20"
            placeholder="Search Books...."
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Search
        </button>
      </form>
      {result.map((book) => (
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
      ))}
    </div>
  );
}
