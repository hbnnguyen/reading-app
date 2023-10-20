import "./Passage.css";
// import HighlightedText from "./HighlightedText";
import Selectable from "./Selectable";
import Definition from "./Definition";
import Quiz from "./Quiz";
import ReadingApi from "../API";
import { useCallback, useEffect, useState } from "react";
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { useContext } from "react";
import userContext from "../userContext";

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
  const { user } = useContext(userContext);

  const [currIndex, setCurrIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [wordToDefine, setWordToDefine] = useState(null);
  const [wordDefinition, setWordDefinition] = useState(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [generatedQuiz, setIsGenerated] = useState(false);
  const [popQuiz, setPopQuiz] = useState(null);


  const reset = useCallback(() => {
    setCurrIndex(null);
    setStartIndex(0);
    setIsStopped(false);
  }, [setIsStopped]);

  useEffect(() => {
    reset();
  }, [isStopped, reset]);

  useEffect(() => {
    // This effect will run whenever wordToDefine changes
    const getWordDefinition = async (word) => {
      try {

//         const newDefinition = await ReadingApi.getDefinition(wordToDefine);
//         setWordDefinition(newDefinition)

        const api = new ChatGPTUnofficialProxyAPI({
          accessToken: process.env.REACT_APP_GPT_ACCESS_TOKEN,
          apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
        })
        console.log(word)
        const prompt = 'Give me a definition of the word ' + word + ' that an 8 year old would understand'
        // const prompt = 'Give me a definition of the word ' + word + ' that an '+ user.age +' year old would understand'

        const newDefinition= await api.sendMessage(prompt)
        console.log(newDefinition)
        setWordDefinition(newDefinition['text'])

        setShowDefinition(true)
      } catch (error) {
        console.error("Error fetching definition:", error);
      }
    };

    if (wordToDefine) {
      getWordDefinition(wordToDefine)
    }

    // console.log(wordToDefine);
  }, [wordToDefine]);

  const handleSelectableClick = (e) => {
    if (e.type === 'contextmenu') { // right click
      e.preventDefault();
      // when right click on a selectable, make a call to dictionary api to get the definition
      let word = e.target.outerText;
      word = word.replace(/[^a-zA-Z ]/g, "");
      setWordToDefine(word)
    }
  };

  // const getWord = (word) => {

  // }

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
      <h2>Passage</h2>
      <div id="paragraph">
        {
          buildParagraph()
        }
      </div>
      <div id="Word-Definition">
        {showDefinition && <Definition word={wordToDefine} wordDefinitions={wordDefinition} />}
      </div>
    </div>
  );
};

export default Passage;