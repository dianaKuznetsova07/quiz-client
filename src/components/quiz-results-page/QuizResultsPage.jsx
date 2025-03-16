import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizResults } from "../../api/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const QuizResultsPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [userResults, setUserResults] = useState([])
  const [questionNumbers, setQuestionNumbers] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  const fetchQuizResults = async () => {
    try {
      const data = await getQuizResults(id)
      console.log(data)
      setQuizTitle(data.title)

      if (data.user_results?.length > 0) {
        let nums = []
        for (let i = 1; i <= data.user_results[0]?.answers?.length; i++) {
            nums.push(i)
        }
        
        setQuestionNumbers(nums)
      }

      setUserResults(data.user_results.map((ur)=>({
        username: ur.username,
        answers: ur.answers.map(answer=>(answer.option_answer?.length > 0 ? answer.option_answer : answer.text_answer)),
        finished_at: ur.finished_at,
      })))
    } catch(err) {
      setErrorMessage(err.response?.data)
    }
  }

  useEffect(() => {
      fetchQuizResults()
  }, [])

  const resultsTable = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="username_col">
            <TableCell>Пользователь</TableCell>
            <TableCell>Время</TableCell>
            {questionNumbers.map((questionNumber, index)=>(
                <TableCell key={index+"head"} align="right">{questionNumber}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {userResults.map((ur, index) => (
            <TableRow key={index+ur.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ur.username}
              </TableCell>
              <TableCell component="th" scope="row">
                {ur.finished_at}
              </TableCell>
              {ur.answers.map((answer, answerIndex)=>(
                <TableCell key={answerIndex} align="right">{answer}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <div>
      <Button variant="contained" color="info" onClick={() => {navigate('/quiz/'+id)}}>
        Назад к опросу
      </Button>

      <h1>{quizTitle}</h1>

      {errorMessage?.length > 0 ? <h3 style={{ color: 'red' }}>{errorMessage}</h3> : <div>{resultsTable}</div>}
    </div>
  )
}

export default QuizResultsPage