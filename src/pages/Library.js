// import { useAuthStatus } from '../hooks/useAuthStatus';
import { useContext, useEffect, useState } from "react";
import userContext from "../userContext";
import ReadingApi from '../API';
import Book from "../components/Book";
import { Navigate } from "react-router-dom";


const Library = () => {
  const { user } = useContext(userContext);
  const [books, setBooks] = useState(({
    data: null,
    isLoading: true
  }));

  useEffect(function fetchAndSetBooks() {
    const fetchBooks = async () => {
      const newBooks = await ReadingApi.getBooks();
      setBooks(({data:newBooks.books.results, isLoading: false}));
    };
    fetchBooks();
  }, []);

  const listBooks = () => {
    const listOfBooks = [];
    if (books) {
      books.data.forEach(element => {
        listOfBooks.push(<Book key={element.id} bookInfo={element} />);
      });
    }
    return listOfBooks;
  };

  if (books.isLoading) return <i>Loading...</i>;

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div id="Library">
      {books && listBooks()}
    </div>
  );

};

export default Library;