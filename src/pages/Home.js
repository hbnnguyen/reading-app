import { useContext, useState, useEffect } from "react";
import userContext from "../userContext";
import ReadingApi from '../API';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Home.css';
import { LOADING_IMG_URL, APP_ID, API_URL } from '../App';
import '@passageidentity/passage-elements/passage-auth';
// import { APP_ID, API_URL } from '../App';

const Home = ({ isLoading, signedIn }) => {
  const { user } = useContext(userContext);
  const [userBooks, setUserBooks] = useState(null);
  const [userTexts, setUserTexts] = useState(null);

  useEffect(function fetchAndSetUserBooks() {
    const fetchUserBooks = async () => {
      if (user) {
        let rows = [];
        for (const bookID in user.books) {
          const bookInfo = await ReadingApi.getBook(bookID);
          const title = bookInfo.title;
          const pageNumber = user.books[bookID];
          rows.push({ bookID: bookID, title: title, pageNumber: pageNumber });
        }
        setUserBooks(rows);
      }
    };
    fetchUserBooks();

    const fetchUserTexts = async () => {
      if (user) {
        let rows = [];
        for (const title in user.texts) {
          rows.push(title);
        }
        setUserTexts(rows);
      }
    };
    fetchUserTexts();
  }, [user]);


  const booksTable =
    <TableContainer component={Paper}>
      <Table sx={{ width: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Your Books</b></TableCell>
            <TableCell align="right"><b>Current Page</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userBooks && userBooks.map((book) => (
            <TableRow
              key={book.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/books/read/${book.bookID}`} style={{
                  textDecoration: "none",
                  color: "black"
                }}>
                  {book.title}
                </Link>
              </TableCell>
              <TableCell align="right">{book.pageNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>;

  const textsTable =
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Your Texts</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userTexts && userTexts.map((title) => (
            <TableRow
              key={title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/texts/read/${title}`} style={{
                  textDecoration: "none",
                  color: "black"
                }}>
                  {title}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>;

  if (isLoading) {
    return (
      <img alt='page loading gif' src={LOADING_IMG_URL}></img>);
  }

  const greeting = () => {
    if (signedIn) {
      if (user) {
        if (user.name) {
          return (
            `Welcome, ${user.name}!`
          );
        } else {
          return (
            `Welcome, pal!`
          );
        }
      }
    }
  };

  if (signedIn === false) {
    return <Navigate to="/login" />;
  }

  const authorizedBody =
    <>
      {booksTable}
      <br /><br />
      {textsTable}
    </>;

  const unauthorizedBody =
    <>

        {/* <passage-auth app-id={APP_ID}></passage-auth> */}

      You have not logged in and cannot view the dashboard.
      <br /><br />
      <a href="/login" >Login to continue.</a>
    </>;

  return (
    <Container className='home-container' maxWidth="sm">
      <Box className='home-main'>
        <div>
          {/* <button onClick={() => {ReadingApi.getBookTextFile(1324)}} > get book </button> */}
          <h1>
            {greeting()}
          </h1>
        </div>
        <br></br>
        <div>
          {signedIn ? authorizedBody : unauthorizedBody}
        </div>
      </Box>
    </Container>
  );
};

export default Home;