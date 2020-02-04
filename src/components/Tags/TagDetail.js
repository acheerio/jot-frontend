import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: "center"
    },
    margin: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    }
}));

export default function TagDetail(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid container item lg={6} md={6} sm={12} justify="center" spacing={1}>
                <Grid item xs={12}>
                    <TextField id="tagName" label="Tag Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="tagDescription" label="Tag Description" />
                </Grid>
            </Grid>
            <Grid container item lg={6} md={6} sm={12} spacing={1}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        Add Tag
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
