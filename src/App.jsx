import './App.css';
import { Routes, Route, redirect } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from "./components/home/Home"
import Navbar from './components/navbar/Navbar';
import LogInPage from './components/login-page/LogInPage';
import SignUpPage from './components/signup-page/SignUpPage';
import QuizPage from './components/quiz-page/QuizPage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CreateQuizPage from './components/create-quiz-page/CreateQuizPage';
import QuizResultsPage from './components/quiz-results-page/QuizResultsPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const checkLoginCookie = () => {
    const cookieValue = Cookies.get("diana-quiz/logged-in")
    console.log('cookieValue', cookieValue)
    if (cookieValue !== undefined) {
      console.log('setting logged in to true')
      setLoggedIn(cookieValue === "true")
    }
  }

  useEffect(() => {
    checkLoginCookie()
  }, [])
  
  return (
    <div className='App'>
      <CssBaseline />

      {
        loggedIn ?
          <div>
            <Navbar setLoggedIn={setLoggedIn} />
    
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/quiz/:id' element={ <QuizPage /> }/>
              <Route path='/quiz/:id/results' element={ <QuizResultsPage /> }/>
              <Route path='/new-quiz' element={ <CreateQuizPage /> }/>
              <Route path='*' element={ <Home /> }/>
            </Routes>
          </div>
          :
          <div>
            <Routes>
              <Route path='/' element={ <LogInPage setLoggedIn={setLoggedIn} /> }/>
              <Route path='/signup' element={ <SignUpPage /> }/>
              <Route path='*' element={ <LogInPage setLoggedIn={setLoggedIn} /> }/>
            </Routes>
          </div>
      }
    </div>
  )
}

export default App