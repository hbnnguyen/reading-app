import { useAuthStatus } from '../hooks/useAuthStatus';
import { useContext } from "react";
import userContext from "../userContext";
import ReadingApi from '../API';

const Home = ({ isLoading, isAuthorized}) => {
  const { user } = useContext(userContext);

  // const {isLoading, isAuthorized, email, id} = useAuthStatus();

  if (isLoading) {
    return null;
  }
  const authorizedBody =
    <>
      You successfully signed in with Passage.
      <br /><br />
      Your name is: {user && user.name}
      <br /><br />
      Your age is: {user && user.age}
      <br /><br />
      Your email is: <b>{user && user.email}</b>
      <br /><br />
      Your id is: <b>{user && user.id}</b>
      <br /><br />
      Your texts are: <b>{user && Object.keys(user.texts)}</b>
      <br /><br />
      Your books: <b>{user && Object.keys(user.books)}</b>
      <br /><br />

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
    <div>
      <div>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
      <div>
        {isAuthorized ? authorizedBody : unauthorizedBody}
      </div>
      {/* <Button onClick={handleBookClick}>add book at page 0</Button> */}
    </div>
  );


};

export default Home;