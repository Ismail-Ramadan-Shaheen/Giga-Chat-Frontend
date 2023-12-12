import React from 'react'
import VerifiedIcon from "@mui/icons-material/Verified"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import { Box } from "@mui/material"
import FollowButton from "../../ProfilePage/FollowButton"
import moment from "moment"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"

function PostHeader({userTag, userProfilePicture, userName,
     finalDate, id, isVisible, handleMouseEnter, handleMouseLeave,
     hoveredProfile, openMenu, anchorPostMenu, handleMenuClose,
     htmlElement, handleMenuButtonClick}) {
        const darkMode = useSelector((state) => state.theme.darkMode)
        const user = useSelector((state) => state.user.user)
        
  return (
    <>
      <div className="post-header flex items-center justify-between">
              <div className="flex items-center">
                <div className=" relative flex hover:underline" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  {isVisible && (
                    <Box className="transition-all" sx={{ zIndex: 5, position: "absolute", backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", padding: "10px", borderRadius: "10px", boxShadow: darkMode ? "0px 0px 1px 1px gray" : "0px 0px 1px 1px black", width: "250px" }}>
                      <div className="flex ">
                        <div className="w-fit">
                          <Link className="hover:brightness-90" to={`/${userTag}`}>
                            <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 50, height: 50 }} />
                          </Link>
                          <div className="text-secondary">{userName}</div>
                          <div className="text-secondary">@{userTag}</div>
                        </div>
                        <div>{userTag !== user.username && <FollowButton tag={userTag} buttonName={hoveredProfile.is_wanted_user_followed ? `Following` : `Follow`}></FollowButton>}</div>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm text-secondary">{user.username !== userTag ? moment(hoveredProfile.birth_date).format("DD/MM/YYYY") : moment(user.birthDate).format("DD/MM/YYYY")}</div>
                        <div className="mt-2 flex w-full justify-around">
                          <span className="text-sm text-secondary">{user.username !== userTag ? hoveredProfile.followings_num : user.followings_num} Following</span>
                          <span className="text-sm text-secondary">{user.username !== userTag ? hoveredProfile.followers_num : user.followers_num} Followers</span>
                        </div>
                      </div>
                    </Box>
                  )}
                  {userName}
                  <VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} />
                </div>
                <Link className="ml-1 text-sm text-ternairy dark:text-secondary" to={`/${userTag}`}>
                  @{userTag}
                </Link>
                <div className="m-1 h-[2px] w-[2px] rounded-full bg-ternairy dark:bg-secondary"></div>
                <Link className="text-sm text-ternairy hover:underline dark:text-secondary" to={`/${userTag}/status/${id}`}>
                  {finalDate}
                </Link>
              </div>
              <Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-[#e7f5fd] hover:text-primary dark:hover:bg-[#031018]">
                <MoreHorizIcon target={"_blank"} variant="text" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="bg-transparent" />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorPostMenu}
                  open={openMenu}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={
                    htmlElement.classList.contains("dark")
                      ? {
                          "& .MuiMenu-paper": {
                            background: "black",
                            borderRadius: "20px",
                            boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                            border: "solid 1px #333435",
                          },
                        }
                      : {
                          "& .MuiMenu-paper": {
                            borderRadius: "20px",
                            boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                          },
                        }
                  }
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleMenuClose} className="flex items-center">
                    <SentimentVeryDissatisfiedIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">Not interested in this post</span>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <PersonAddAltIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">Follow @{userTag}</span>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <VolumeOffOutlinedIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">Mute @{userTag}</span>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <BlockOutlinedIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">Block @{userTag}</span>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link to={`/${userTag}/status/${id}/retweets`}>
                    <QueryStatsOutlinedIcon className="mr-3 text-base dark:text-white" />
                    <span className="text-[15px] dark:text-white">View post engagements</span>
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
              </Link>
            </div>
    </>
  )
}

export default PostHeader
