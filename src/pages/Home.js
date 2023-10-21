import { useAuthStatus } from '../hooks/useAuthStatus';
import { useContext, useState, useEffect } from "react";
import userContext from "../userContext";
import ReadingApi from '../API';
import { Link } from "react-router-dom";

import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Home.css';
import {LOADING_IMG_URL} from '../App'

const Home = ({ isLoading, isAuthorized }) => {
  const { user } = useContext(userContext);
  const [userBooks, setUserBooks] = useState(null);
  const [userTexts, setUserTexts] = useState(null);


  // const {isLoading, isAuthorized, email, id} = useAuthStatus();
  useEffect(function fetchAndSetUserBooks() {
    const fetchUserBooks = async () => {
      if (user) {
        let rows = [];
        for (const bookID in user.books) {
          const bookInfo = await ReadingApi.getBook(bookID);
          const title = bookInfo.book.title;
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
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
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
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
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
    <img alt='page loading gif' src={LOADING_IMG_URL}></img>)
  }

  const authorizedBody =
    <>
      <p>Hi {user && user.name}!</p>

      {textsTable}
      <br /><br />
      {booksTable}
    </>;

  const unauthorizedBody =
    <>
      You have not logged in and cannot view the dashboard.
      <br /><br />
      <a href="/login" >Login to continue.</a>
    </>;

  // const handleBookClick = async () => {
  //   let data = {bookID: 1342, bookPage: 0}
  //   await ReadingApi.saveUserBookPage(user, data)
  // }

  // const handleBookClick = async () => {
  //   let data = {bookID: 1342, pageNumber: 50}
  //   let text = await ReadingApi.getBookPage(data)
  //   console.log(text)
  // }


  return (
    <Container className='home-container' maxWidth="sm">
    <Box className='home-main'>
      <div>
        <h1>
          {isAuthorized ? 'Welcome!' : 'Unauthorized'}
        </h1>

      </div>
      <br></br>
      <div>
        {isAuthorized ? authorizedBody : unauthorizedBody}
      </div>
      {/* <Button onClick={handleBookClick}>add book at page 0</Button> */}
    </Box>
</Container>
  );


};

export default Home;