import React, { useContext } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { tableRef } from "./TagTable";
import { UserContext } from "../../userContext";

const endpoint = "http://api.jot-app.com/";
//const endpoint = "http://localhost:5000/";

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

export default function TagAdd(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const [state, setState] = React.useState({
    title: "",
    description: ""
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  function clear() {
    setState({
      title: "",
      description: ""
    });
  }

  function handleAdd() {
    let url = endpoint + "attributes/add?";
    url += "title=" + state.title;
    url += "&description=" + state.description;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userContext.user.jwt
      }
    }).then(() => {
      tableRef.current && tableRef.current.onQueryChange();
    });
    clear();
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid container item lg={6} md={6} sm={12} justify="center" spacing={1}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Tag Name"
            onChange={handleChange}
            value={state.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Tag Description"
            onChange={handleChange}
            value={state.description}
          />
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
            onClick={handleAdd}
          >
            Add Tag
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
