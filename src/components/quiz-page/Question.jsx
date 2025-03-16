import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Question = ({question, questionIndex, setAnswer}) => {
  const [errorMessage, setErrorMessage] = useState("")

  console.log('Question', question)

  const handleOptionSelect = (event) => {
    setAnswer(event.target.value)
  }

  const handleTextInput = (event) => {
    setAnswer(event.target.value)
  }

  const questionInput = question.question_type === 'choice' ? (
    <div>
      <RadioGroup onChange={handleOptionSelect}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {question.options.map(option => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </div>
  ) : (
    <div>
      <TextField onChange={handleTextInput}
          id="outlined-multiline-flexible"
          label="Ваш ответ"
          multiline
          fullWidth
          maxRows={4}
        />
    </div>
  )

  return (
    <Container component="main" maxWidth="lg">
        <h2 key={question.id}>{questionIndex}.{question.title}</h2>
        {questionInput}
    </Container>
  )
}

export default Question