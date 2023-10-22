import "./Passage.css";
// import HighlightedText from "./HighlightedText";
import Selectable from "./Selectable";
import Definition from "./Definition";
// import Quiz from "./Quiz";
// import ReadingApi from "../API";
import { useCallback, useEffect, useState } from "react";
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { useContext } from "react";
import userContext from "../userContext";
import { LOADING_IMG_URL } from '../App';
import ReadingApi from "../API";

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

const Passage = ({ pageNumber, text, isStopped, setIsStopped, setTextStartPoint, utterance }) => {
  const { user } = useContext(userContext);

  const [currIndex, setCurrIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [wordToDefine, setWordToDefine] = useState(null);
  const [wordDefinition, setWordDefinition] = useState(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [open, setOpen] = useState(false);

  const reset = useCallback(() => {
    setCurrIndex(null);
    setStartIndex(0);
    setIsStopped(false);
  }, [setIsStopped]);

  useEffect(() => {
    reset();
  }, [isStopped, reset]);

  useEffect(() => {

    const getWordDefinition = async (word) => {
      try {

        // const api = new ChatGPTUnofficialProxyAPI({
        //   accessToken: process.env.REACT_APP_GPT_ACCESS_TOKEN,
        //   apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
        // });

        let age = 12;
        if (user.age) {
          age = user.age;
        }
        // const prompt = 'Give me a definition of the word ' + word + ' that an 8 year old would understand'
        const prompt = 'Give me a definition of the word ' + word + ' that an ' + age + ' year old would understand';
        const newDefinition = ReadingApi.promptGPT(prompt).then((res) => {
          setWordDefinition(res);
          setShowDefinition(true);
        })
      } catch (error) {
        console.error("Error fetching definition:", error);
      }
    };

    if (wordToDefine) {
      getWordDefinition(wordToDefine);
    }

  }, [wordToDefine]);

  const handleSelectableClick = (e) => {
    if (e.type === 'contextmenu') { // right click
      e.preventDefault();
      // when right click on a selectable, make a call to dictionary api to get the definition
      let word = e.target.outerText;
      word = word.replace(/[^a-zA-Z ]/g, "");
      setWordToDefine(word);
      setOpen(!open);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setWordDefinition(null);
  };

  const getStartIndex = (startIndex) => {
    setStartIndex(startIndex);
    setTextStartPoint(startIndex);
    // console.log(startIndex);
  };

  if (utterance) {
    utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      setCurrIndex(charIndex + startIndex);
    });

    utterance.addEventListener("end", () => {
      reset();
    });
  }

  const buildParagraph = () => {
    const words = splitText(text);
    const paragraph = [];

    words.forEach((word, index) => {
      paragraph.push(
        <Selectable
          key={word.startIndex + word.word + index}
          wordData={word}
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
      <h4>Left click on a word to start the text to speech at that position. Right click to get the definition.</h4>
      <div id="paragraph">
        {
          buildParagraph()
        }
      </div>
      <div id="Word-Definition">
        {showDefinition && <Definition open={open} handleClose={handleClose} word={wordToDefine} wordDefinition={wordDefinition ? wordDefinition : <img alt='page loading gif' src={LOADING_IMG_URL}></img>} />}
      </div>
    </div>
  );
};

export default Passage;