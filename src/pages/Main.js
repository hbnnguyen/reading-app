import { useEffect, useState } from "react";
import TextToSpeech from "../components/TextToSpeech";

const Main = () => {
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [synth, setSynth] = useState(null);

  const text = "It is a truth universally acknowledged, that a single man in " +
    "possession of a good fortune, must be in want of a wife.";

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
      <TextToSpeech text={text} synth={synth} voice={voice} setVoice={setVoice} pitch={pitch} rate={rate} volume={volume} />
    </div>
  );
};

export default Main;