import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from "../../api/users";
import { useState } from "react";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (formData.get("password") !== formData.get("repeat-password")) {
      setErrorMessage("passwords don't match")
      return
    }

    try {
      const data = await createUser(formData.get("username"), formData.get("email"), formData.get("full_name"), formData.get("password"))

      navigate("/login")
    } catch (error) {
      setErrorMessage(error.response?.data)
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            inputProps={{ minLength: 2, maxLength: 128 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Почта e-mail"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Имя и Фамилия"
            name="full_name"
            autoFocus
            inputProps={{ minLength: 1, maxLength: 500 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            inputProps={{ minLength: 2, maxLength: 64 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeat-password"
            label="Повторите пароль"
            type="password"
            id="repeat-password"
            inputProps={{ minLength: 2, maxLength: 64 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Link to='/login'>Уже есть учетная запись? Войти</Link>
        </Box>
      </Box>

      {errorMessage && errorMessage.length > 0 && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
    </Container>
  )
}

export default SignUpPage