import "./Passage.css";
// import HighlightedText from "./HighlightedText";
import Selectable from "./Selectable";
import { useCallback, useEffect, useState } from "react";

const splitText = (text) => {
  const words = [];
  for (let i = 0; i < text.length - 1; i++) {
    const wordData = { startIndex: null, word: "" };

    if (text[i] !== " ") {
      wordData.startIndex = i;
      while (text[i] !== " " && i < text.length) {
        wordData.word += text[i];
        i++;
      }
    }
    words.push(wordData);
  }
  return words;
};

const Passage = ({ text, isStopped, setIsStopped, setTextStartPoint, utterance }) => {
  const [currIndex, setCurrIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const reset = useCallback(() => {
    setCurrIndex(null);
    setStartIndex(0);
    setIsStopped(false)
  }, [setIsStopped])

  useEffect(() => {
    reset()
  }, [isStopped, reset])

  const handleSelectableClick = (e) => {
    if (e.type === 'contextmenu') { // right click
      e.preventDefault();
      // when right click on a selectable, make a call to dictionary api to get the definition
      console.log('Right click');
    }
  };

  const getStartIndex = (startIndex) => {
    setStartIndex(startIndex);
    setTextStartPoint(startIndex);
    console.log(startIndex);
  };

  if (utterance) {
    utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      setCurrIndex(charIndex + startIndex);
    });

    utterance.addEventListener("end", () => {
     reset()
    });
  }

  const buildParagraph = () => {
    const words = splitText(text);
    const paragraph = [];

    words.forEach((word) => {
      paragraph.push(
        <Selectable
          key={word.startIndex + word.word}
          wordData={word}
          onClick={handleSelectableClick}
          onContextMenu={handleSelectableClick}
          getStartIndex={getStartIndex}
          isHighlighted={currIndex === word.startIndex}
        />
      );
      paragraph.push(" ");
    });

    return paragraph;
  };

  return (
    <div id="Passage">
      <h2>Passage</h2>
      <div id="paragraph">
        {
          buildParagraph()
        }
      </div>
    </div>
  );
};

export default Passage;