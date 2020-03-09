import React from "react";

import clsx from "clsx";
import ContactFind from "./ContactFind";
import ContactTable from "./ContactTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import ContactAdd from "./ContactAdd";
import ContactEdit from "./ContactEdit";
import { tableRef } from "./ContactTable";

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
  let contactViewComponent = null;

  const [selectedContactId, setSelectedContactId] = React.useState(0);
  const [apiRoute, setApiRoute] = React.useState("contacts/all?");
  const [sortField, setSortField] = React.useState("firstName");
  const [contactView, setContactView] = React.useState("ContactFind");

  const refreshTable = newRoute => {
    setApiRoute(newRoute);
    tableRef.current.onQueryChange();
  };

  const changeSort = newSort => {
    setSortField(newSort);
    tableRef.current.onQueryChange();
  };

  // Code to control which page is shown to user
  switch (contactView) {
    case "ContactFind":
      contactViewComponent = (
        <ContactFind
          setContactView={setContactView}
          refreshTable={refreshTable}
          changeSort={changeSort}
          sortField={sortField}
        />
      );
      break;
    case "ContactAdd":
      contactViewComponent = <ContactAdd setContactView={setContactView} />;
      break;
    case "ContactEdit":
      contactViewComponent = (
        <ContactEdit
          setContactView={setContactView}
          selectedContactId={selectedContactId}
          refreshTable={refreshTable}
        />
      );
      break;
    default:
      contactViewComponent = <h1>No page selected...</h1>;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>{contactViewComponent}</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContactTable
              selectedContactId={selectedContactId}
              setSelectedContactId={setSelectedContactId}
              setContactView={setContactView}
              apiRoute={apiRoute}
              setApiRoute={setApiRoute}
              changeSort={changeSort}
              sortField={sortField}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
