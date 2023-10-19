import React, { useCallback, useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const Quiz = ({ quiz }) => {
   const [question, setQuestion] = useState(null)
   const[options, setOptions] = useState([])
   const[answer, setAnswer] = useState(null)
   const[listItems, setList] = useState(null)
   const [value, setValue] = React.useState('');
   const [error, setError] = React.useState(false);
   const [helperText, setHelperText] = React.useState('Choose wisely');

   useEffect(() => {
    setQuestion(quiz['Question'])
    setOptions(quiz['Options'])
    setAnswer(options[quiz['CorrectOption']])

    const li = options.map(option => <FormControlLabel value={option} control={<Radio />} label={option} />);
    setList(li)

  }, [options, quiz]);

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
