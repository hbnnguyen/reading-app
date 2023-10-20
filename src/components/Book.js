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

      <div id={bookInfo.title}>
        {bookInfo.authors && bookInfo.authors[0] ? (
          <p><b>{bookInfo.title}</b> by {bookInfo.authors[0].name}</p>
        ) : (
          <p><b>{bookInfo.title}</b></p>
        )}
      </div>

    </Link>
  );
};

export default Book;