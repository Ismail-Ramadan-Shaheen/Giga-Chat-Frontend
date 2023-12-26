import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"

import PersonAddIcon from "@mui/icons-material/PersonAdd"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CachedIcon from "@mui/icons-material/Cached"

import { APIs } from "../../constants/signupConstants"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

const NotificationComponent = ({ logo, type, text, date, notifier }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const timestamp = new Date(date)
  const day = timestamp.getDate()
  const month = timestamp.getMonth() + 1 // Months are zero-indexed
  const year = timestamp.getFullYear()
  const hour = timestamp.getHours()
  const minute = timestamp.getMinutes()

  const formattedDate = `${hour}:${minute} on ${day}/${month}/${year}`

  const userToken = useSelector((state) => state.user.token)



  const navigate=useNavigate()
  return (
    <div onClick={() => {
      navigate(`/${notifier ? notifier.username : text.split(" ")[0]}`)
    }} className="flex min-h-[64px] cursor-pointer flex-col items-center pb-3 pl-4 pr-4 pt-3 hover:bg-lightHover dark:hover:bg-darkHover">
      <div className="flex items-center gap-3 self-start">
        {type === "retweet" && <CachedIcon className="text-4xl text-green-500" />}
        {type === "like" && <FavoriteIcon className="text-4xl text-red-500" />}
        {type === "follow" && <PersonAddIcon className="text-4xl text-blue-500" />}
        <Avatar className="mr-3" alt={"j"} src={logo} sx={{ width: 30, height: 30 }} />
      </div>
      <div className="text ml-14 mt-2 flex-1 self-start ">
        <div className=" text-md">
          <span className="font-semibold">{notifier ? notifier.nickname : text.split(" ")[0]}</span>
          <span>{" " + text.split(" ").slice(1).join(" ")}</span>
        </div>
      </div>
      <div className="self-end">
        <span className=" text-xs ">{formattedDate}</span>
      </div>
    </div>
  )
}

export default NotificationComponent
