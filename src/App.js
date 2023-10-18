import './App.css';
// import TextToSpeech from './components/TextToSpeech';
// import Passage from './components/Passage';
import Main from './pages/Main';
import WriteBook from './pages/WriteBook';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/read' element={<Main />} />
        <Route path='/write' element={<WriteBook />} />
      </Routes>
    </>
  );
}

export default App;
