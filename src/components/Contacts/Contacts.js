import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import ContactFind from "./ContactFind";
import ContactTable from "./ContactTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ContactAdd from "./ContactAdd";
import ContactEdit from "./ContactEdit";

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

export default function Contacts() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Code to set currently selected contact:
  const [selectedContactId, setSelectedContactId] = React.useState(0);

  // Code to control which page is shown to user
  let contactViewComponent = null;
  const [contactView, setContactView] = React.useState("ContactFind");
  switch (contactView) {
    case "ContactFind":
      contactViewComponent = <ContactFind setContactView={setContactView} />;
      break;
    case "ContactAdd":
      contactViewComponent = <ContactAdd setContactView={setContactView} />;
      break;
    case "ContactEdit":
      contactViewComponent = (
        <ContactEdit
          setContactView={setContactView}
          selectedContactId={selectedContactId}
        />
      );
      break;
    default:
      contactViewComponent = <h1>No page selected...</h1>;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Action Area */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>{contactViewComponent}</Paper>
        </Grid>
        {/* Contacts */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContactTable
              setSelectedContactId={setSelectedContactId}
              setContactView={setContactView}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
