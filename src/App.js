import './App.css';
import GPTTest from './pages/GPTTest';
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
        <Route path='/gpt' element={<GPTTest />} />
      </Routes>
    </>
  );
}

export default App;
