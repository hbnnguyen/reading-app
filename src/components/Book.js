import { Link } from "react-router-dom";
import { Box } from '@mui/material';
import './Book.css';

const Book = ({ bookInfo }) => {
  return (
    <Box className="book-card library-book" id={bookInfo.title}>
      {bookInfo.authors && bookInfo.authors[0] ? (
        <Link to={`/books/read/${bookInfo.id}`} style={{
          textDecoration: "none",
          color: "black"
        }}>
          <div>
            <p><b>{bookInfo.title}</b></p>
            <p>by {bookInfo.authors[0].name}</p>
            <img src={bookInfo.formats["image/jpeg"]} alt={bookInfo.title}></img>
          </div>
        </Link>
      ) : (
        <Link to={`/books/read/${bookInfo.id}`} style={{
          textDecoration: "none",
          color: "black"
        }}>
          <p><b>{bookInfo.title}</b></p>
        </Link>
      )}
    </Box>
  );
};

export default Book;