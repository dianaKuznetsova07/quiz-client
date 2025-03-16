import axios from "axios"

export async function postLogin(username, password) {
  try {
    const response = await axios.post("/api/v1/users/login", {
      username: username,
      password: password
    })
    return response.data
  } catch(err) {
    throw err
  }
}

export async function postLogout() {
  try {
    const response = await axios.post("/api/v1/users/logout", {})
    return response.data
  } catch(err) {
    throw err
  }
}
