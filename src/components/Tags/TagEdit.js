import React, { useContext } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { tableRef } from "./TagTable";
import { UserContext } from "../../userContext";

const endpoint = "https://api.jot-app.com/";
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

export default function TagEdit(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [state, setState] = React.useState({
    title: "",
    description: ""
  });

  React.useEffect(() => {
    async function fetchData() {
      console.log("useEffect fetchData firing...");
      let url = endpoint + "attributes/" + props.selectedTagId;
      console.log(url);
      const attributesResponse = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userContext.user.jwt
        }
      });
      const responseData = await attributesResponse.json();
      console.log(responseData);
      setState({
        title: responseData.title,
        description: responseData.description
      });
    }
    fetchData();
  }, [props.selectedTagId, userContext.user.jwt]);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  function handleEdit() {
    let url = endpoint + "attributes/update/";
    url += props.selectedTagId + "?";
    url += "title=" + state.title;
    url += "&description=" + state.description;
    console.log(url);
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userContext.user.jwt
      }
    }).then(() => {
      tableRef.current && tableRef.current.onQueryChange();
      props.setTagView("TagAdd");
    });
  }

  const deleteTag = () => {
    async function deleteRequest() {
      await fetch(
        endpoint + "attributes/delete/" + props.selectedTagId,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userContext.user.jwt
          }
        }
      );
    }
    deleteRequest().then(() => {
      props.setTagView("TagAdd");
      tableRef.current.onQueryChange();
    });
  };

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
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={deleteTag}
          >
            Delete Tag
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
