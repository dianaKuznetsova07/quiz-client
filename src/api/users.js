import axios from "axios";

export async function createUser(username, email, full_name, password) {
  try {
    const response = await axios.post("/api/v1/users", {
      username: username,
      email: email,
      full_name: full_name,
      password: password
    })
    return response.data
  } catch(err) {
    throw err
  }
}