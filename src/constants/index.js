function getUser() {
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
  } else {
    user = null
  }
  return user
}

export default getUser