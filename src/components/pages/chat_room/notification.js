import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "2px solid lightgray",
        flexGrow: 1,
    },
    content: {
        padding: "0.5rem 0.3rem",
        fontSize: "0.6rem",
        userSelect: "none"
    }
}));


function Notification(props) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.border} />
            <Typography
                className={classes.content}
                color="textSecondary">{props.children}</Typography>
            <div className={classes.border} />
        </div>
    );
}


export default Notification;