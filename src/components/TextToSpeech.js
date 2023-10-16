import React, { useState, useEffect } from "react";
import Passage from "./Passage";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  // const [isSpeaking, setIsSpeaking] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [textToRead, setTextToRead] = useState(text);

  const setTextStartPoint = (startIndex) => {
    setTextToRead(text.slice(startIndex, text.length - 1));
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(textToRead);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [textToRead]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;

      utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      });

      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();
    setIsPaused(false);
    setTextStartPoint(0);
    setIsStopped(true)
  };

  const resetTTS = () => {
    setTextStartPoint({startIndex: 0});
  };

  if (utterance) {
    utterance.addEventListener("end", () => {
      resetTTS();
    });
  }

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
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
    <div id="TextToSpeech">
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

      <button onClick={handlePlay}> {isPaused ? "Resume" : "Play"} </button>
      <button
        onClick={handlePause}>
        Pause
      </button>
      <button onClick={handleStop}>Stop</button>

      <Passage
        text={text}
        isPaused={isPaused}
        isStopped={isStopped}
        setIsStopped={setIsStopped}
        utterance={utterance}
        setTextStartPoint={setTextStartPoint}
      />
    </div>
  );
};

export default TextToSpeech;