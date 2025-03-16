import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { postLogin } from "../../api/access";
import Cookies from "js-cookie";

const LogInPage = ({setLoggedIn}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      const responseData = await postLogin(data.get("username"), data.get("password"))
      console.log(responseData)

      Cookies.set("diana-quiz/logged-in", "true")
      setLoggedIn(true)
      navigate("/")
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data)
      console.log(errorMessage)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Логин"
            name="username"
            autoFocus
            inputProps={{ minLength: 2, maxLength: 128 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{ minLength: 2, maxLength: 64 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Link to='/signup'>Нет учетной записи? Зарегистрироваться</Link>
        </Box>
      </Box>

      {errorMessage?.length > 0 && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
    </Container>
  )
}

export default LogInPage