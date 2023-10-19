import { useContext, useEffect } from "react";
import userContext from "../userContext";
import { Link } from "react-router-dom";
import ReadingApi from '../API';

const Book = ({ bookInfo }) => {
  const { user } = useContext(userContext);



  return (
    <Link to={`/books/read/${bookInfo.id}`} style={{
      textDecoration: "none",
      color: "black"
    }}>
      <div id="Book">
        <div id={bookInfo.title}>
          {bookInfo.authors && bookInfo.authors[0] ? (
            <h4>{bookInfo.title} by {bookInfo.authors[0].name}</h4>
          ) : (
            <h4>{bookInfo.title}</h4>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Book;