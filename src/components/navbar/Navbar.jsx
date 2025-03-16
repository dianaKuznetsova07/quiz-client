import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material'
import { postLogout } from '../../api/access';
import Cookies from "js-cookie";

const Navbar = ({setLoggedIn}) => {
  const navigate = useNavigate();
  
  const handleSignOut = async (event) => {
    event.preventDefault()

    try {
      const data = await postLogout()
      console.log(data)

      Cookies.set("diana-quiz/logged-in", "false")
      setLoggedIn(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      // TODO error message popup
    }
  }
  
  return (
    <Container sx={{ my: 3 }}>
      <Grid container rowSpacing={5} columnSpacing={5} >
        <Grid item xs={3}>
          <Typography component={Link} variant="h6" to="/">
            Мои опросы
          </Typography>
        </Grid>
        
        <Grid item xs={3}>
          <Typography component={Link} variant="h6" to="/new-quiz">
              Создать опрос
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography component={Link} variant="h6" onClick={handleSignOut}>
            Выйти
          </Typography>
        </Grid>        
      </Grid>
    </Container>
  )
}

export default Navbar