import { useEffect, useState } from "react"
import { completeQuiz, getQuiz } from "../../api/api"
import { useNavigate, useParams } from 'react-router-dom';
import Question from "./Question";
import { Alert, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const QuizPage = () => {
    const [quiz, setQuiz] = useState({})
    const [questions, setQuestions] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [completed, setCompleted] = useState(false)

    const { id } = useParams();

    const navigate = useNavigate();

    const questionAnswersMap = new Map();
  
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz(id)
        console.log(data)
        setQuiz(data)
        setQuestions(data.questions)
      } catch(err) {
        setErrorMessage(err.response?.data)
      }
    }
  
    useEffect(() => {
        fetchQuiz()
    }, [])

    // construct a map for answers based on questions
    useEffect(() => {
        questionAnswersMap.clear()
    }, [questions])

    const handleSubmit = async () => {
        try {
          // complete quiz
          
          const responseData = await completeQuiz(quiz.id, Array.from(questionAnswersMap, ([key, value]) => (value)))
          console.log(responseData)
    
          setCompleted(true)
        } catch (error) {
          console.log(error)
          setErrorMessage(error.response?.data)
          console.log(errorMessage)
        }
    }

    const mainQuizContent = (
      <div>
      {quiz.is_owner && <Button variant="contained" color="info" onClick={() => {navigate('/quiz/'+quiz.id+'/results')}}>
        Посмотреть ответы
      </Button>}

      <h1>{quiz.title}</h1>
          
      <div>
        {questions.map((question, index) => (
            <Question key={question.id} question={question} questionIndex={index+1}
            setAnswer= {(answer) => {
              question.question_type === 'choice'
              ? questionAnswersMap.set(question.id, {question_id: question.id, option_answer: answer})
              : questionAnswersMap.set(question.id, {question_id: question.id, text_answer: answer})
            }}/>
        ))}
      </div>
      
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Отправить ответы
      </Button>
          
      <div>{errorMessage?.length > 0 && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}</div>
      </div>
    )

    const quizCompleteResult = (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Опрос успешно пройден!
      </Alert>
    )
  
    return (
      completed ? quizCompleteResult : mainQuizContent
    )
  }
  
  export default QuizPage