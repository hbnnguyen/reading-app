import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Main from './pages/Main';
import NoMatch from './pages/NoMatch';

export const APP_ID = "wVORUhbzClDJ0XADyyTLLtwj"

function App() {
  return (
    <>
      <NavBar />
      {/* fallback props can hold a component */}
      {/* <Suspense fallback={<div className="container">Loading...</div>}> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/read' element={<Main />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;
