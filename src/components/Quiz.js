import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import "./Quiz.css";
import ReadingApi from '../API';
import { LOADING_IMG_URL } from '../App';


const Quiz = ({ text }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [listItems, setList] = useState(null);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [generatedQuiz, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);

  const generateQuiz = async (text) => {
    try {
      const prompt = 'Generate a multiple choice question please output only the quiz as a JSON in the form {Question: Q, Options:[], CorrectOption:[index]}. Base the quiz on the following passage: ' + text;
      const res = await ReadingApi.promptGPT(prompt);
      return res;
    } catch (error) {
      console.error("Error fetching definition:", error);
      return error;
    }
  };

  const getQuiz = async (text) => {
    try {
      setIsLoading(true);
      generateQuiz(text).then(res => {
        try {
          // console.log(res);
          const data = JSON.parse(res);
          const options = data['Options'];
          setQuestion(data['Question']);
          setAnswer(options[data['CorrectOption']]);
          const li = options.map(option => <FormControlLabel key={option.slice(2)} value={option} control={<Radio />} label={option} />);
          setList(li);
          setIsGenerated(true);
          setIsLoading(false)
        } catch (error) {
          console.log(error);
          setIsLoading(false)
        }
      });
    } catch (error) {
      console.log(error);
      setQuizFailed(true)
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

  if (isLoading) {
    return (
      <img alt='page loading gif' src={LOADING_IMG_URL}></img>);
  }

  return (
    <div className='quiz'>
      <div id="gen-quiz">{!generatedQuiz &&
        <Button variant="outlined" onClick={async () => await getQuiz(text)}> Generate Quiz </Button>
      }
      </div>
      <div id="quiz">{generatedQuiz &&
        <form onSubmit={handleSubmit}>
          <h4 id="quiz">Pop quiz!: {question} </h4>
          <RadioGroup
            aria-labelledby="quiz"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            {listItems}
          </RadioGroup>
          <p>{helperText}</p>
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
