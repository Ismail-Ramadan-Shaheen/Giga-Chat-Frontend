import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useState } from "react"
import axios from "axios"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { styles } from "../../../styles"

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/
  const upperCaseLetterRegex = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const lowerCaseLetterRegex = /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const specialCharacterRegex = /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const numberRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const lengthRegex = /^[a-zA-Z0-9!@#$%^&*()]{8,}$/

  function checkPassword(newPassword) {
    return !passwordRegex.test(newPassword)
  }

  function hasUpperCaseLetter(newPassword) {
    return upperCaseLetterRegex.test(newPassword)
  }
  function hasLowerCaseLetter(newPassword) {
    return lowerCaseLetterRegex.test(newPassword)
  }
  function hasSpecialCharachter(newPassword) {
    return specialCharacterRegex.test(newPassword)
  }
  function hasNumber(newPassword) {
    return numberRegex.test(newPassword)
  }
  function hasCorrectLength(newPassword) {
    return lengthRegex.test(newPassword)
  }

  const APIs = {
    mock: { changePasswordAPI: "http://localhost:3001/changePassword" },
    actual: { changePasswordAPI: "" },
  }

  const handlePasswordChange = () => {
    setErrorMsg("")
    // call password check api to compare the actual password
    if (newPassword === confirmPassword) {
      axios
        .patch(APIs.mock.changePasswordAPI, { oldPassword: currentPassword, newPassword: newPassword })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/settings/account"
          }
        })
        .catch((err) => {
          if (err.response.status === 400) setErrorMsg("Incorrect password")
          else setErrorMsg("Error updating password, please try again later")
          console.log(err)
        })
    } else {
      // error new passwords don't match
      setErrorMsg("New password doesn't match confirmation")
    }
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Change your password</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Change your password at any time.</p>

      <div className="flex flex-col p-5">
        <div className="input-container">
          <input className={currentPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="currentPassword" id="currentPassword" autoComplete="off" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            Current password
          </label>
        </div>
        <Link to={"/password_reset"} className="mt-2 text-xs text-primary">
          Forgot password?
        </Link>
      </div>

      <hr />

      <div className="flex flex-col p-5">
        <div className="input-container mb-4">
          <input className={newPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="newPassword" id="newPassword" autoComplete="off" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            New password
          </label>
        </div>
        <div className="input-container mb-5">
          <input className={confirmPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            Confirm password
          </label>
        </div>
        <Stack severity={`${checkPassword(newPassword) ? "error" : "success"}`}>
          <Alert severity={`${hasUpperCaseLetter(newPassword) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleTop}>
            Require uppercase letter
          </Alert>
          <Alert severity={`${hasLowerCaseLetter(newPassword) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
            Require lowercase letter
          </Alert>
          <Alert severity={`${hasSpecialCharachter(newPassword) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
            Require special character !@#$%^&*()
          </Alert>
          <Alert severity={`${hasNumber(newPassword) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
            Require number
          </Alert>
          <Alert severity={`${hasCorrectLength(newPassword) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleBottom}>
            Require at least 8 characters
          </Alert>
        </Stack>
      </div>

      <hr />

      <div className="flex p-5">
        <div className="text-red-600">{errorMsg}</div>
        <button id="changePasswordBtn" className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handlePasswordChange} disabled={currentPassword === "" || newPassword === "" || confirmPassword === "" || checkPassword(newPassword)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
