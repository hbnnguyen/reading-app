import { useContext, useEffect, useState } from "react";
import TextToSpeech from "../components/TextToSpeech";
import { useParams } from "react-router";
import userContext from "../userContext";
import ReadingApi from "../API";
import Quiz from "../components/Quiz";
import Button from '@mui/material/Button';

const ReadBook = () => {
  const { user } = useContext(userContext);
  const { bookID } = useParams();
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [synth, setSynth] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState(({ data: null, isLoading: true }));


  useEffect(function fetchAndSetText() {
    const fetchText = async () => {
      let data = { bookID: bookID, pageNumber: 1 };
      if (user) {
        data.pageNumber = user.books[bookID];
        setPageNumber(user.books[bookID]);
      }
      const newText = await ReadingApi.getBookPage(data);
      setText(({ data: newText, isLoading: false }));
    };
    fetchText();
  }, [pageNumber, bookID, user]);

  useEffect(() => {
    setSynth(window.speechSynthesis);
    if (synth) {
      const voices = synth.getVoices();
      setVoice(voices[0]);

      return () => {
        synth.cancel();
      };
    }
  }, [text, synth]);

  const handleVoiceChange = (event) => {
    let voices;
    if (synth) {
      voices = synth.getVoices();
    }
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handlePrevPage = async () => {
    const newPage = pageNumber - 1;

    setPageNumber(newPage)
    let data = {bookID: bookID, pageNumber: newPage}
    await ReadingApi.saveUserBookPage(user, data)
  };


  const handleNextPage = async () => {
    const newPage = pageNumber + 1;
    setPageNumber(newPage);

    let data = {bookID: bookID, pageNumber: newPage}
    await ReadingApi.saveUserBookPage(user, data)
  };

  return (
    <div id="Main">
      <label>
        Voice:
        <select value={voice?.name} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Pitch:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
      </label>

      <br />

      <label>
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      <br />
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>

      <br />
      <TextToSpeech text={text.data ? text.data : " "} synth={synth} voice={voice} setVoice={setVoice} pitch={pitch} rate={rate} volume={volume} />
      <button onClick={pageNumber > 0 ? handlePrevPage: undefined}>previous page</button>
      <button onClick={handleNextPage}>next page</button>
      {/* <Button variant="outlined" onClick={pageNumber > 0 ? handlePrevPage: undefined}>previous page</Button>
      <Button variant="outlined" onClick={handleNextPage}>next page</Button> */}
      <div id="quiz"> {
        !text.isLoading && <Quiz text={text.data}/>
      }
      </div>
    </div>
  );
};

export default ReadBook;