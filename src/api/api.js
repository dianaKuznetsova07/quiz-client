import axios from "axios"

export async function getQuiz(id) {
  try {
    const response = await axios.get("/api/v1/quiz/" + id)
    return response.data
  } catch(err) {
    throw err
  }
}

export async function completeQuiz(id, answers) {
  try {
    const response = await axios.post("/api/v1/quiz/" + id + "/complete", {
      answers: answers,
    })
    return response.data
  } catch(err) {
    throw err
  }
}

export async function getQuizResults(id) {
  try {
    const response = await axios.get("/api/v1/quiz/" + id + "/results")
    return response.data
  } catch(err) {
    throw err
  }
}

export async function getUserQuizes() {
  try {
    const response = await axios.get("/api/v1/users/quizes")
    return response.data
  } catch(err) {
    throw err
  }
}

export async function createQuiz(title, questions) {
  try {
    const response = await axios.post("/api/v1/quiz/create", {
      title: title,
      questions: questions,
    })
    return response.data
  } catch(err) {
    throw err
  }
}
