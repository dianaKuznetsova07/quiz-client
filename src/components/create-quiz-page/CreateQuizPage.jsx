import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import BallotIcon from '@mui/icons-material/Ballot';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { createQuiz } from '../../api/api';

const CreateQuizPage = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [quizTitle, setQuizTitle] = useState("")
    const [quiestionsToCreate, setQuiestionsToCreate] = useState([])
    
    const navigate = useNavigate();

    const addQuestionWithOptions = () => {
        setQuiestionsToCreate([...quiestionsToCreate, {title: '', type:'choice', options: ['', '', '', '']}])
    }

    const addQuestionWithTextAnswer = () => {
        setQuiestionsToCreate([...quiestionsToCreate, {title: '', type: 'text'}])
    }

    const handleSubmit = async () => {
        console.log('quiestionsToCreate', quiestionsToCreate)
        try {
            const data = await createQuiz(quizTitle, quiestionsToCreate)
            navigate('/quiz/'+data.quiz_id)
          } catch(err) {
            setErrorMessage(err.response?.data)
          }
    }

    const createQuizForm = (
        <div>
            <TextField fullWidth margin="normal" label='Название опроса' onChange={(event) => {
                setQuizTitle(event.target.value)
            }}/>
            {quiestionsToCreate.map((question, index)=>(
                <div key={index}>
                    <TextField fullWidth label={index+1} margin="normal" onChange={(event) => {
                        quiestionsToCreate[index].title = event.target.value
                    }}/>
                    {question.type === 'choice' && question.options.map((option, optionIndex)=>(
                        <div key={optionIndex+'option'}>
                            <TextField fullWidth label={'Вариант '+(optionIndex+1)} margin="normal" variant="standard" onChange={(event) => {
                                quiestionsToCreate[index].options[optionIndex] = event.target.value
                            }}/>
                        </div>
                    ))}
                </div>
            ))}
            <BallotIcon onClick={addQuestionWithOptions}></BallotIcon>
            <TextSnippetIcon onClick={addQuestionWithTextAnswer}></TextSnippetIcon>
            <div>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Создать опрос
                </Button>
            </div>
        </div>
    )
  
    return (
      <div>
        {errorMessage?.length > 0 && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
        <div>{createQuizForm}</div>
      </div>
    )
  }
  
  export default CreateQuizPage