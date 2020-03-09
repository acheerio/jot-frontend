import React from "react";

import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import ActivityAdd from "./ActivityAdd";
import ActivityEdit from "./ActivityEdit";
import ActivityFind from "./ActivityFind";
import ActivityTable from "./ActivityTable";
import { tableRef } from "../Activities/ActivityTable";

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

  const [apiRoute, setApiRoute] = React.useState("activities/all?");
  const [sortField, setSortField] = React.useState("notes");
  const [selectedActivityId, setSelectedActivityId] = React.useState(0);
  const [activityView, setActivityView] = React.useState("ActivityFind");

  const changeSort = newSortField => {
    setSortField(newSortField);
    tableRef.current.onQueryChange();
  };

  const refreshTable = newRoute => {
    setApiRoute(newRoute);
    tableRef.current.onQueryChange();
  };

  switch (activityView) {
    case "ActivityFind":
      activityViewComponent = (
        <ActivityFind
          setActivityView={setActivityView}
          refreshTable={refreshTable}
          changeSort={changeSort}
        />
      );
      break;
    case "ActivityAdd":
      activityViewComponent = <ActivityAdd setActivityView={setActivityView} />;
      break;
    case "ActivityEdit":
      activityViewComponent = (
        <ActivityEdit
          setActivityView={setActivityView}
          selectedActivityId={selectedActivityId}
        />
      );
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
            <ActivityTable
              setSelectedActivityId={setSelectedActivityId}
              setActivityView={setActivityView}
              apiRoute={apiRoute}
              sortField={sortField}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
