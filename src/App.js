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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReadText from './pages/ReadText';

export const LOADING_IMG_URL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/43a14ae7-38bd-4670-a62a-c0b84942569f/d9vbsdw-1c158bd1-e416-4e12-85a6-3658be0874c4.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzYTE0YWU3LTM4YmQtNDY3MC1hNjJhLWMwYjg0OTQyNTY5ZlwvZDl2YnNkdy0xYzE1OGJkMS1lNDE2LTRlMTItODVhNi0zNjU4YmUwODc0YzQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R6MCtC0Yy25VSbPQJo19QTkei0XOjq4iSQ8Ss0QCFX8"

const theme = createTheme({
  primary: '#8e653e',
  secondary: '#634736'
})

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
    <div className='App'>
      <userContext.Provider value={{ user: user.data }}>
        <NavBar className='Nav-Bar'/>
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} isAuthorized={isAuthorized} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/read' element={<Main />} />
          <Route path='/profile' element={<Profle />} />
          <Route path='/library' element={<Library />} />
          <Route path="/books/read/:bookID" element={<ReadBook />} />
          <Route path="/texts/read/:title" element={<ReadText />} />
          <Route path="*" element={<NoMatch />} />
          <Route path='/write' element={<WriteBook />} />
          <Route path='/gpt' element={<GPTTest />} />
        </Routes>
      </userContext.Provider>
    </div>
    </>
  );
}

export default App;
