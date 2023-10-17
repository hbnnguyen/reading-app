import './App.css';
// import TextToSpeech from './components/TextToSpeech';
// import Passage from './components/Passage';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/read' element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
