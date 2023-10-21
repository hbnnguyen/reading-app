import React, { useCallback, useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import "./Quiz.css";

const Quiz = ({ text }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [listItems, setList] = useState(null);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [generatedQuiz, setIsGenerated] = useState(false);

  const generateQuiz = async (text) => {
    try {
      const api = new ChatGPTUnofficialProxyAPI({
        accessToken: process.env.REACT_APP_GPT_ACCESS_TOKEN,
        apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
      });
      const prompt = 'Generate a multiple choice question please output only the quiz as a JSON in the form "Question: Q, Options:[], CorrectOption:[index]". Base the quiz on the following passage: ' + text;
      return await api.sendMessage(prompt);
    } catch (error) {
      console.error("Error fetching definition:", error);
      return error;
    }
  };
  const getQuiz = async (text) => {
    try {
      generateQuiz(text).then(resp => {
        try {
          const data = JSON.parse(resp['text']);
          const options = data['Options'];
          setQuestion(data['Question']);
          setAnswer(options[data['CorrectOption']]);
          const li = options.map(option => <FormControlLabel value={option} control={<Radio />} label={option} />);
          setList(li);
          setIsGenerated(true);
        } catch (error) {
          console.log(error);
        }

      });
    } catch (error) {
      console.log(error);
    }

  };
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === answer) {
      setHelperText('You got it!');
      setError(false);
    } else {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    }
  };

  return (

    <div className='quiz'>
      <div id="gen-quiz">{!generatedQuiz &&
        <Button variant="outlined" onClick={async () => await getQuiz(text)}> Generate Quiz </Button>
      }
      </div>
      <div id="quiz">{generatedQuiz &&
        <form onSubmit={handleSubmit}>
          <FormLabel id="quiz">Pop quiz!: {question} </FormLabel>
          <RadioGroup
            aria-labelledby="quiz"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            {listItems}
          </RadioGroup>
          <FormHelperText>{helperText}</FormHelperText>
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Check Answer
          </Button>
        </form>
      }
      </div>
    </div>
  );
};

export default Quiz;
