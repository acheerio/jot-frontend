import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TagTable from "./TagTable";
import TagDetail from "./TagDetail";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

export default function Tags() {
  const classes = useStyles();
  return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Action Area */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TagDetail />
            </Paper>
          </Grid>
          {/* Tags */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TagTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
}
