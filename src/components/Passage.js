import "./Passage.css";
import HighlightedText from "./HighlightedText";
import Selectable from "./Selectable";
import { useState } from "react";

const splitText = (text) => {
  const words = []
  for (let i = 0; i < text.length - 1; i++) {
    const wordData = {startIndex: null, word: ""}

    if (text[i] !== " ") {
      wordData.startIndex = i
      while (text[i] !== " " && i < text.length) {
        wordData.word += text[i]
        i++
      }
    }
    words.push(wordData)
  }
  return words
}

const Passage = ({ text, isPaused, isSpeaking, highlightSection}) => {
  const [startPoint, setStartPoint] = useState(0)

  const getStartPoint = (startIndex) => {
    setStartPoint(startIndex)
    text = text.slice(startPoint, text.length - 1)
  }

  const buildParagraph = (text) => {
    const words = splitText(text);
    const paragraph = [];

    words.forEach((word) => {
        
      paragraph.push(<Selectable key={word.startIndex + word.word} wordData={word} getStartPoint={getStartPoint}/>);
      paragraph.push(" ");
    });
 
    return paragraph;
  };

  

  const canSelect = () => {
    if (isPaused && isSpeaking) {
      return true;
    } else if (!isPaused && !isSpeaking) {
      return true;
    } if (!isPaused && isSpeaking) {
      return false;
    }
  };

  return (
    <div id="Passage">
      <h2>Passage</h2>
      <div id="paragraph">
        {
          canSelect() ? buildParagraph(text)
          : <HighlightedText text={text} {...highlightSection} />
        }
      </div>
    </div>
  );
};

export default Passage;