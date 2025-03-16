import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { getUserQuizes } from '../../api/api';

const Home = () => {
  const [quizes, setQuizes] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const fetchUserQuizes = async () => {
    try {
      const data = await getUserQuizes()
      console.log(data)
      setQuizes(data.quizes)
    } catch(err) {
      setErrorMessage(err.response?.data)
    }
  }

  useEffect(() => {
    fetchUserQuizes()
}, [])

  const userQuizesList = (
    <div>
      {errorMessage?.length > 0 && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
      <h3>Добро пожаловать!</h3>
      <h3>Список ваших опросов:</h3>
      <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        <List>
          {quizes.map((quiz, index)=>(
            <span key={index}>
              <ListItem disablePadding onClick={()=>navigate('quiz/'+quiz.quiz_id)}>
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary={quiz.title}/>
                </ListItemButton>
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </Box>
    </div>
  )
  
  return (
    <div>
      {errorMessage?.length > 0 ? <h3 style={{ color: 'red' }}>{errorMessage}</h3> : <div>{userQuizesList}</div>}
    </div>
  )
}

export default Home