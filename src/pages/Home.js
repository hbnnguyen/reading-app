import { useAuthStatus } from '../hooks/useAuthStatus';
import { useContext } from "react";
import userContext from "../userContext";

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
    </>;

  const unauthorizedBody =
    <>
      You have not logged in and cannot view the dashboard.
      <br /><br />
      <a href="/login" >Login to continue.</a>
    </>;

  return (
    <div>
      <div>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
      <div>
        {isAuthorized ? authorizedBody : unauthorizedBody}
      </div>
    </div>
  );


};

export default Home;