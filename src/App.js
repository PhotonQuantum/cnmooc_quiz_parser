import React, {useEffect, useState} from 'react';
import {AppBar, Container, CssBaseline, Grid, makeStyles, TextField, Toolbar, Typography} from "@material-ui/core";
import Mark from "./components/mark";

const useStyles = makeStyles((theme) => ({
    inputForm: {
        padding: theme.spacing(4, 0, 4)
    }
}))

function App() {
    const classes = useStyles();
    const [json, setJson] = useState("");
    const [marks, setMarks] = useState([]);
    const [parseError, setParseError] = useState(false);
    useEffect(() => {
        try {
            const parsed_json = JSON.parse(json);
            const quoted_answers = parsed_json.examSubmit.submitContent;
            const answers = JSON.parse(quoted_answers);
            setParseError(false);
            setMarks(answers.map((item) => {
                const parsed_item = JSON.parse(item);
                return parsed_item.errorFlag === "right";
            }));
        } catch (e) {
            setParseError(json.trim() !== "");
            setMarks([]);
        }
    }, [json])
    return (
        <>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        CNMOOC Quiz Parser
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" component="main">
                <form className={classes.inputForm}>
                    <TextField multiline rows={4} fullWidth variant="outlined" inputProps={{spellCheck: "false"}}
                               error={parseError} label="Exam JSON" placeholder="Please paste json here."
                               value={json} onChange={(e) => {
                        setJson(e.target.value)
                    }}/>
                </form>
                <Grid container spacing={3}>
                    {marks.map((mark, id) => {
                        return (<Grid item md={2} sm={4} xs={6}>
                            <Mark id={id + 1} isCorrect={mark}/>
                        </Grid>)
                    })}
                </Grid>
            </Container>
        </>
    );
}

export default App;
