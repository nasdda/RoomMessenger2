import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'

import {
    IconButton, Tooltip, Drawer,
    Typography, Divider
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DeleteForever from '@material-ui/icons/DeleteForever'


import { useSelector } from 'react-redux'
import { selectUserInfos } from '../../../redux/slice/slice'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import { useHistory } from 'react-router-dom'

import {
    collection, doc, deleteDoc,
    getDocs, getFirestore, query,
    updateDoc
} from "firebase/firestore"

const auth = getAuth()
const db = getFirestore()

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
        width: "100%",
        marginBottom: "0.5rem"
    },
    usernamePiece: {
        maxWidth: "15rem",
        overflow: "hidden",
        whiteSpace: "no-wrap",
        textOverflow: "ellipsis",
    },
    deleteIconButton: {
        height: "3rem",
        width: "3rem",
        borderRadius: "50%",
        padding: "0.5rem",
        color: "red",
        "&:hover": {
            backgroundColor: "#fff1f0"
        }
    },
    deleteIcon: {
        width: "2.5rem",
        height: "2.5rem",
        color: "#ff5757"
    }
}));



function Sidebar(props) {
    const ref = useRef(null)
    const [user] = useAuthState(auth)
    const history = useHistory()
    const userInfos = useSelector(selectUserInfos)
    const classes = useStyles()

    useOutsideAlerter(ref, props.setOpen)
    let host = undefined
    let hostUid = undefined
    const members = []

    for (const uid in userInfos) {
        if (userInfos[uid].isHost) {
            host = {
                username: userInfos[uid].username,
                photoURL: userInfos[uid].photoURL
            }
            hostUid = uid
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
                referrerpolicy="no-referrer"
                alt="avatar"
                className={classes.avatar}
            />
        )
    }

    const deleteRoom = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())

        try {
            const roomDocRef = doc(db, "rooms", params.room)

            await updateDoc(roomDocRef, {
                active: false
            })

            const q1 = query(collection(db, "rooms", params.room, "users"))
            const q1Snapshot = await getDocs(q1);
            await q1Snapshot.forEach(async (d) => {
                await deleteDoc(doc(db, "rooms", params.room, "users", d.id))
            })

            const q2 = query(collection(db, "rooms", params.room, "messages"))
            const q2Snapshot = await getDocs(q2);
            await q2Snapshot.forEach(async (d) => {
                await deleteDoc(doc(db, "rooms", params.room, "messages", d.id))
            })

            await deleteDoc(doc(db, "rooms", params.room))
        } catch (e) {
            alert("Failed to delete room.")
            console.log(e)
        }
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

    const isHost = user && hostUid && user.uid === hostUid

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
                    <IconButton
                        color="primary"
                        onClick={() => props.setOpen(false)}
                        className={classes.emojiButton}
                        component="span"
                    >
                        <ChevronLeftIcon />
                    </IconButton>
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
                <Divider className={classes.divider} />
                <div style={
                    {
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                    {isHost &&
                        <Tooltip title="Delete Room" arrow>
                            <IconButton
                                className={classes.deleteIconButton}
                                component="span"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to permanently delete this room?")) {
                                        deleteRoom().then(() => {
                                            history.push('/')
                                        })
                                    }
                                }}
                            >
                                <DeleteForever className={classes.deleteIcon} />
                            </IconButton>
                        </Tooltip>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default React.memo(Sidebar)