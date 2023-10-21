// import { useAuthStatus } from '../hooks/useAuthStatus';
import { useContext, useEffect, useState } from "react";
import userContext from "../userContext";
import ReadingApi from '../API';
import Book from "../components/Book";
import { Navigate } from "react-router-dom";
import './Library.css';
import { Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { LOADING_IMG_URL } from '../App';


const Library = () => {
  const { user } = useContext(userContext);
  const [books, setBooks] = useState(({
    data: null,
    isLoading: true
  }));

  useEffect(function fetchAndSetBooks() {
    const fetchBooks = async () => {
      try {
        const newBooks = await ReadingApi.getBooks();
        setBooks(({ data: newBooks.books.results, isLoading: false }));
      } catch (error) {
        console.log(error)
      }
    };
    fetchBooks();
  }, []);

  const listBooks = () => {
    const listOfBooks = [];
    if (books.data) {
      books.data.forEach(book => {
        listOfBooks.push(
          <Book key={book.id} bookInfo={book} />
        );
      });
    }
    return listOfBooks;
  };

  // const listOfBooks =
  //   <div>
  //     {books && listBooks()}
  //   </div>


  // if (books.isLoading) return <i>Loading...</i>;
  if (books.isLoading) return (
    <img alt="book flipping" src={LOADING_IMG_URL} ></img>
  );


  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <br></br>
      <h4>Select a book to read!</h4>
      <div id="Library">
        {books && listBooks()}
      </div>
    </div>
  );

};

export default Library;