import React, { useState} from "react";

import Pagination from './pagination/pagination';
import CardData from './BookCard/BookCard-component';
import axios from "axios";
import "./styles.css";

function App() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const[currentPage,setCurrentPage]=useState(0);

  const handleInputChange = e => {
    const val = e.target.value;
    setBook(val);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyBBuev5bakwhCXknPw8GtefmPvwja32Arw&maxResults=40`)
    .then(data=> setResult(data.data.items));
  };

  const booksPerPage=12;
  const indexOfLastBook=currentPage*booksPerPage;
  const currentBook=result.slice(indexOfLastBook,indexOfLastBook+booksPerPage);

  const pageCountperPage=Math.ceil(result.length/booksPerPage);

   const changePage=({selected})=>{
        setCurrentPage(selected);
     }  


  return (
    <div className="container mt-4">
      <h1 className="text-primary d-flex justify-content-center">Book Search App</h1>
      <form onSubmit={handleSubmit} className="form-group d-flex justify-content-center">
        <div className="form-group">
          <input
            type="text"
            onChange={handleInputChange}
            className="form-control m-10"
            placeholder="Search Books...."
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-danger mb-auto">
          Search
        </button>
      </form>
      {
        currentBook.map(bookVal => (
            <div className="style" key={bookVal.id}>
              <CardData
              thumbnail={bookVal.volumeInfo.imageLinks.thumbnail}
              title={bookVal.volumeInfo.title}
              pageCount={bookVal.volumeInfo.pageCount}
              language={bookVal.volumeInfo.language}
              authors={bookVal.volumeInfo.authors}
              publisher={bookVal.volumeInfo.publisher}
              description={bookVal.volumeInfo.description}
              infoLink={bookVal.volumeInfo.infoLink}
                />
            </div>
          ))
       } 
       <Pagination loading={currentBook} changePage={changePage} pageCountperPage={pageCountperPage}/>        
    </div>

  );
}

export default App;
