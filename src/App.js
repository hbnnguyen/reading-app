import './App.css';
import GPTTest from './pages/GPTTest';
// import TextToSpeech from './components/TextToSpeech';
// import Passage from './components/Passage';
import Main from './pages/Main';
import WriteBook from './pages/WriteBook';
// import { lazy, Suspense } from 'react';
import { useAuthStatus } from './hooks/useAuthStatus';
import userContext from "./userContext";

import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './components/Login';

import Profle from './pages/Profile'
import NoMatch from './pages/NoMatch';
import { useEffect, useState } from 'react';
import ReadingApi from './API';
import Library from './pages/Library';
import ReadBook from './pages/ReadBook';

export const APP_ID = process.env.REACT_APP_PASSAGE_APP_ID;
// export const API_URL= "localhost:4000"

function App() {
  const [user, setUser] = useState({
    data: null,
    isLoading: true
  });

  const { isLoading, isAuthorized, id } = useAuthStatus();

  useEffect(function fetchAndSetUser() {
    const fetchUser = async () => {
      if (id) {
        const currUser = await ReadingApi.getUser(id);
        setUser({
          data: currUser,
          isLoading: false
        });

      } else {
        setUser({
          data: null,
          isLoading: false
        });
      }
    };
    fetchUser();
  }, [id]);

  return (
    <>
      <userContext.Provider value={{ user: user.data }}>
        <NavBar />
        {/* fallback props can hold a component */}
        {/* <Suspense fallback={<div className="container">Loading...</div>}> */}
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} isAuthorized={isAuthorized} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/read' element={<Main />} />
          <Route path='/profile' element={<Profle />} />
          <Route path='/library' element={<Library />} />
          <Route path="/books/read/:bookID" element={<ReadBook />} />
          <Route path="*" element={<NoMatch />} />
          <Route path='/write' element={<WriteBook />} />
          <Route path='/gpt' element={<GPTTest />} />
        </Routes>
        {/* </Suspense> */}
      </userContext.Provider>
    </>
  );
}

export default App;
