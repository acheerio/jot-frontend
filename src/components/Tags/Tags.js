import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TagTable from "./TagTable";
import TagAdd from "./TagAdd";
import TagEdit from "./TagEdit";
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

  const [selectedTagId, setSelectedTagId] = React.useState(0);
  const [tagView, setTagView] = React.useState("TagAdd");
  let tagViewComponent = null;

  switch (tagView) {
    case "TagAdd":
      tagViewComponent = <TagAdd setTagView={setTagView} />;
      break;
    case "TagEdit":
      tagViewComponent = (
        <TagEdit
          setTagView={setTagView}
          selectedTagId={selectedTagId}
          // updateTableOnDataChange={updateTableOnDataChange}
        />
      );
      break;
    default:
      tagViewComponent = <h1>No page selected...</h1>;
  }

  return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Action Area */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {tagViewComponent}
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
