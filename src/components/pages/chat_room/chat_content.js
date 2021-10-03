import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
import app from '../../../firebase/firebase'

// import { useSelector, useDispatch } from 'react-redux'

import Tooltip from '@material-ui/core/Tooltip'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import { useSelector } from 'react-redux'
import { selectUserInfos } from '../../../redux/slice/slice'



const useStyles = makeStyles(theme => ({
    isOthers: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "0.5rem",
        justifyContent: "left",
        alignItems: "flex-end"
    },
    isUser: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        marginBottom: "0.5rem",
        alignItems: "flex-end"
    },
    userContainer: {
        backgroundColor: "#f8e8ff",
        width: "fit-content",
        maxWidth: "25rem",
        padding: "0.3rem 0.8rem",
        borderRadius: "1rem",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        hyphens: "auto"

    },
    othersContainer: {
        backgroundColor: "#e6e6e6",
        width: "fit-content",
        maxWidth: "25rem",
        padding: "0.3rem 0.8rem",
        borderRadius: "1rem"
    },
    avatarIcon: {
        height: "1.4rem",
        width: "1.4rem",
        borderRadius: "50%",
    },
    leftAvatar: {
        marginRight: "0.4rem"
    },
    rightAvatar: {
        marginLeft: "0.4rem"
    },
    smallUsername: {
        fontSize: "0.6rem",
        margin: "0",
        color: "grey",
    },
    userNMMargin: {
        marginRight: "0.5rem"
    },
    otherNMMargin: {
        marginLeft: "0.5rem"
    },
    userNameMessageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    otherNameMessageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end"
    }
}))


const auth = getAuth()

function ChatContent(props) {
    const [user] = useAuthState(auth)
    const userInfos = useSelector(selectUserInfos)

    const classes = useStyles()

    const Avatar = (avatarProps) => {
        return (
            <>
                {props.photoURL ?
                    <img
                        src={props.photoURL}
                        className={`${classes.avatarIcon} ${avatarProps.className}`}
                        alt="avatar" /> :
                    <img
                        className={`${classes.avatarIcon} ${avatarProps.className}`}
                        src="http://www.drumall.com/shop/img/member_no_img.gif"
                        alt="avatar" />}
            </>
        )
    }

    const time = new Date(props.createdAt)
    const year = time.getFullYear()
    const month = time.getMonth()
    const date = time.getDate()
    const hours = time.getHours() % 12
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    const ampm = hours >= 12 ? "AM" : "PM"
    const parsedDate = `${month}/${date}/${year} ${hours}:${minutes}${ampm}`

    return (
        <div className={(user && props.uid === user.uid) ? classes.isUser : classes.isOthers}>
            {!(user && props.uid === user.uid) &&
                <Avatar className={classes.leftAvatar} />
            }
            <div className={(user && props.uid === user.uid) ? classes.userNameMessageContainer : classes.otherNameMessageContainer}>
                <p className={`${classes.smallUsername} ${(user && props.uid === user.uid) ? classes.userNMMargin : classes.otherNMMargin}`}>
                    {userInfos[props.uid].username || ""}
                </p>
                <Tooltip
                    title={parsedDate}
                    placement={"bottom"}
                    arrow
                >
                    <div className={(user && props.uid === user.uid) ?
                        classes.userContainer :
                        classes.othersContainer}>
                        {props.message}
                    </div>
                </Tooltip>
            </div>

            {(user && props.uid === user.uid) &&
                <Avatar className={classes.rightAvatar} />
            }
        </div>

    )
}


export default React.memo(ChatContent)