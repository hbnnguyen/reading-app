import React, { useState, useEffect } from "react";
import Passage from "./Passage";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [highlightSection, setHighlightSection] = React.useState({ from: 0, to: 0 });
  const [textToRead, setTextToRead] = useState(text)

  let speaking;

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  g

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
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
      });

      synth.speak(utterance);
    }

    setIsPaused(false);
    speaking = synth.speaking;
    setIsSpeaking(speaking);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();
    setIsPaused(true);

    speaking = synth.speaking;
    setIsSpeaking(speaking);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();
    setIsPaused(false);

    speaking = synth.speaking;
    setIsSpeaking(speaking);
    setHighlightSection({ from: 0, to: 0 });
  };

  if (utterance) {
    utterance.addEventListener("end", () => {
      setHighlightSection({ from: 0, to: 0 });
      setIsSpeaking(false);
      setIsPaused(false);
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
        disabled={!isSpeaking}
        onClick={isSpeaking ? handlePause : undefined}>
        Pause
      </button>
      <button onClick={handleStop}>Stop</button>

      <Passage
        text={text}
        isPaused={isPaused}
        isSpeaking={isSpeaking}
        highlightSection={highlightSection}
      />
    </div>
  );
};

export default TextToSpeech;