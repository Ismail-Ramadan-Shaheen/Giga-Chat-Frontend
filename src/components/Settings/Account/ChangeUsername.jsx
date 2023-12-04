import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"
import { changeUsername } from "../../../store/UserSlice"

const ChangeUsername = () => {
  const [userName, setUserName] = useState("")
  const user = useSelector((state) => state.user.user)
  const [errorMsg, setErrorMsg] = useState("")

  const APIs = {
    mock: { ChangeUsernameAPI: "http://localhost:3001/changeUsername" },
    actual: { ChangeUsernameAPI: "" },
  }

  const dispatch = useDispatch()

  const handleChangeUsername = () => {
    setErrorMsg("")
    axios
      .patch(APIs.mock.ChangeUsernameAPI, { newUsername: userName })
      .then((res) => {
        if (res.status == 200) {
          dispatch(changeUsername(userName))
          window.location.href = "/settings/account"
        }
      })
      .catch((err) => {
        if (err.response.status === 400) setErrorMsg("Username already exists")
        else setErrorMsg("Error changing username, please try again later")
        console.log(err)
      })
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account_information">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Change your username</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Update your username.</p>

      <div className="flex flex-col p-5">
        <div className="input-container">
          <input type="text" id="currentUsername" className="form-input filled-input border-0 !bg-gray-100 !text-ternairy dark:!bg-gray-900" disabled />
          <label className="input-label" htmlFor="username">
            Current Username
          </label>
        </div>
      </div>

      <div className="flex flex-col p-5">
        <div className="input-container mb-4">
          <input className={userName === "" ? "form-input" : "form-input filled-input"} type="text" id="newUsername" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <label className="input-label" htmlFor="password">
            New Username
          </label>
        </div>
      </div>

      <hr />

      <div className="flex p-5">
        <div className="text-red-600">{errorMsg}</div>
        <button id="changeUsernameBtn" className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handleChangeUsername} disabled={userName === ""}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangeUsername
