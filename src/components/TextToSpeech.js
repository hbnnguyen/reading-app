import React, { useState, useEffect } from "react";
import Passage from "./Passage";

//FIXME: fix the highlighting for google voice selections

const TextToSpeech = ({ text, synth, voice, pitch, rate, volume }) => {
  text = text.replace("_", "");

  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [textToRead, setTextToRead] = useState(text);

  const setTextStartPoint = (startIndex) => {
    setTextToRead(text.slice(startIndex, text.length - 1));
  };

  useEffect(() => {
    if (synth) {
      const u = new SpeechSynthesisUtterance(textToRead);
      setUtterance(u);

      if (utterance) {
        utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        if (synth) {
          synth.cancel();
          resetTTS();
        }
        synth.speak(utterance);
      }
    }

  }, [textToRead, synth]);

  const handlePlay = () => {
    if (synth) {
      if (isPaused) {
        synth.resume();
      } else {
        utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;

        synth.speak(utterance);
      }

      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (synth) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const resetTTS = () => {
    setIsPaused(false);
    setTextStartPoint(0);
    setIsStopped(true);
  };

  const handleStop = () => {
    if (synth) {
      synth.cancel();
      resetTTS();
    }
  };

  if (utterance) {
    utterance.addEventListener("end", () => {
      resetTTS();
    });
  }


  return (
    <div id="TextToSpeech">
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