import React from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {Check, Clear} from "@material-ui/icons";
import {green, red} from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
    p: {
        margin: 0
    },
    paper: {
        padding: theme.spacing(2)
    },
    flex: {
        display: "flex"
    },
    check: {
        color: green[400]
    },
    cross: {
        color: red[400]
    }
}))

const Mark = ({id, isCorrect}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} variant="outlined">
            <Grid container>
                <Grid item xs={6} alignItems="center" className={classes.flex}>
                    {isCorrect ? <Check className={classes.check}/> : <Clear className={classes.cross}/>}
                </Grid>
                <Grid item xs={6} alignItems="center" className={classes.flex}>
                    <p className={classes.p}>#{id}</p>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Mark;