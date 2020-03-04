import React from "react";
import clsx from "clsx";
import ActivityTable from "./ActivityTable";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ActivityFind from "./ActivityFind";
import ActivityEdit from "./ActivityEdit";
import ActivityAdd from "./ActivityAdd";

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

export default function Activities() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  let activityViewComponent = null;
  const [activityView, setActivityView] = React.useState("ActivityFind");
  switch (activityView) {
    case "ActivityFind":
      activityViewComponent = <ActivityFind setActivityView={setActivityView} />;
      break;
    case "ActivityAdd":
      activityViewComponent = <ActivityAdd setActivityView={setActivityView} />;
      break;
    case "ActivityEdit":
      activityViewComponent = <ActivityEdit setActivityView={setActivityView} />;
      break;
    default:
      activityViewComponent = <h1>No page selected...</h1>;
  }
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Action Area */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>{activityViewComponent}</Paper>
        </Grid>
        {/* Activities */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ActivityTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );}
