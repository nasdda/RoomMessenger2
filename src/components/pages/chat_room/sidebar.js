import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'

import {
    IconButton, Tooltip, Drawer,
    Typography, Divider
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'


import { useSelector } from 'react-redux'
import { selectUserInfos } from '../../../redux/slice/slice'


const drawerWidth = "17rem"

function useOutsideAlerter(ref, setToggle) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setToggle(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}`,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    emojiButton: {
        height: "1rem",
        width: "1rem",
        borderRadius: "50%",
        padding: "0.5rem",
    },
    membersList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 1rem"
    },
    sectionName: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    divider: {
        margin: "1rem"
    },
    avatar: {
        height: "1.5rem",
        width: "1.5rem",
        borderRadius: "50%"
    },
    userInfoPiece: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    usernamePiece: {
        maxWidth: "15rem",
        overflow: "hidden",
        whiteSpace: "no-wrap",
        textOverflow: "ellipsis",
        marginBottom: "0.5rem"
    }
}));

function Sidebar(props) {
    const ref = useRef(null)
    const userInfos = useSelector(selectUserInfos)
    const classes = useStyles()
    useOutsideAlerter(ref, props.setOpen)
    let host = undefined
    const members = []
    for (const uid in userInfos) {
        if (userInfos[uid].isHost) {
            host = {
                username: userInfos[uid].username,
                photoURL: userInfos[uid].photoURL
            }
        } else {
            members.push({
                uid: uid,
                username: userInfos[uid].username,
                photoURL: userInfos[uid].photoURL
            })
        }
    }
    const Avatar = (props) => {
        return (
            <img
                src={props.src}
                alt="avatar"
                className={classes.avatar}
            />
        )
    }

    const displayMembers = members.map(memberInfo => {
        return (
            <div
                key={memberInfo.uid}
                className={classes.userInfoPiece}
            >
                <Avatar src={memberInfo.photoURL} />
                <div className={classes.usernamePiece}>{memberInfo.username}</div>
            </div >
        )
    })


    return (
        <div>
            <Drawer
                ref={ref}
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Tooltip title="Close" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => props.setOpen(false)}
                            className={classes.emojiButton}
                            component="span"
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={classes.sectionName}>
                    <Typography variant="h6">
                        Host
                    </Typography>
                </div>
                <div className={classes.membersList}>
                    {
                        host &&
                        <div className={classes.userInfoPiece}>
                            <Avatar src={host.photoURL} />
                            <div className={classes.usernamePiece}>
                                {host.username}
                            </div>
                        </div>
                    }
                </div>
                <Divider className={classes.divider} />
                <div className={classes.sectionName}>
                    <Typography variant="h6">
                        Members
                    </Typography>
                </div>
                <div className={classes.membersList}>
                    {displayMembers}
                </div>
            </Drawer >
        </div >
    )
}

export default React.memo(Sidebar)