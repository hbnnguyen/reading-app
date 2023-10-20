import React, { useCallback, useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'

const Quiz = ({ text }) => {
   const [question, setQuestion] = useState(null)
   const[options, setOptions] = useState([])
   const[answer, setAnswer] = useState(null)
   const[listItems, setList] = useState(null)
   const [value, setValue] = React.useState('');
   const [error, setError] = React.useState(false);
   const [helperText, setHelperText] = React.useState('Choose wisely');
   const [generatedQuiz, setIsGenerated] = useState(false);
   const [popQuiz, setPopQuiz] = useState(null);


  useEffect(() => {
    const generateQuiz = async () => {
      try {
        const api = new ChatGPTUnofficialProxyAPI({
          accessToken: process.env.REACT_APP_GPT_ACCESS_TOKEN,
          apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
        })
        const prompt = 'Generate a multiple choice question please output only the quiz as a JSON in the form "Question: Q, Options:[], CorrectOption:[index]". Base the quiz on the following passage: ' + text
        const resp = await api.sendMessage(prompt)
        console.log(resp)
        console.log(JSON.parse(resp['text']))
        setPopQuiz(JSON.parse(resp['text']))
        setIsGenerated(true)
        setQuestion(popQuiz['Question'])
        setOptions(popQuiz['Options'])
        setAnswer(options[popQuiz['CorrectOption']])
    
        const li = options.map(option => <FormControlLabel value={option} control={<Radio />} label={option} />);
        setList(li)

      } catch (error) {
        console.error("Error fetching definition:", error);
      }
  }
  if (!generatedQuiz) {
      generateQuiz()
  }
});

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answer)
    console.log(value)
    if (value === answer) {
      setHelperText('You got it!');
      setError(false);
    } else  {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } 
  };

  return(
    <div>
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

    </div>
  )
};

export default Quiz;
