import React, { useContext } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { tableRef } from "../Activities/ActivityTable";
import { UserContext } from "../../userContext";

// const endpoint = "http://api.jot-app.com/";
const endpoint = "http://localhost:5000/";

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

export default function ActivityAdd(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const [state, setState] = React.useState({
    type: "",
    notes: "",
    status: "",
    completeDate: "",
    dueDate: "",
    contactFullName: ""
  });

  React.useEffect(() => {
    async function fetchData() {
      let url = endpoint + "activities/" + props.selectedActivityId;
      const attributesResponse = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userContext.user.jwt
        }
      });
      const responseData = await attributesResponse.json();
      let shortCompleteDate = "";
      let shortDueDate = "";
      if (responseData.completeDate) {
        shortCompleteDate = responseData.completeDate.slice(0, 10);
      }
      if (responseData.dueDate) {
        shortDueDate = responseData.dueDate.slice(0, 10);
      }
      setState({
        type: responseData.type,
        notes: responseData.notes,
        status: responseData.status,
        completeDate: shortCompleteDate,
        dueDate: shortDueDate,
        contactFullName: responseData.contact.fullName
      });
    }
    fetchData();
  }, [props.selectedActivityId, userContext.user.jwt]);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  function handleEdit() {
    let url = endpoint + "activities/update?";
    url += "activityId=" + props.selectedActivityId;
    url += "&type=" + state.type;
    url += "&notes=" + state.notes;
    url += "&status=" + state.status;
    if (state.completeDate != null && state.dueDate !== "null") {
      url += "&completeDate=" + state.completeDate;
    }
    if (state.dueDate != null && state.dueDate !== "null") {
      url += "&dueDate=" + state.dueDate;
    }
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userContext.user.jwt
      }
    }).then(() => {
      tableRef.current && tableRef.current.onQueryChange();
      props.setActivityView("ActivityFind");
    });
  }

  // Function to update record:
  const handleDelete = () => {
    async function deleteRequest() {
      await fetch(endpoint + "activities/delete/" + props.selectedActivityId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userContext.user.jwt
        }
      });
    }
    deleteRequest().then(() => {
      props.setActivityView("ActivityFind");
      tableRef.current.onQueryChange();
    });
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            value={state.type}
            onChange={handleChange}
          >
            <MenuItem value={"Note"}>Note</MenuItem>
            <MenuItem value={"Task"}>Task</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <p>Associated Contact:</p>
          <p>
            <b>{state.contactFullName}</b>
          </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="notes"
            label="Description"
            value={state.notes}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container item lg={6} md={6} sm={12} spacing={2}>
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="status"
            value={state.status}
            onChange={handleChange}
          >
            <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
            <MenuItem value={"Not Started"}>Not Started</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Complete"}>Complete</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="completeDate"
            label="Completed Date"
            type="date"
            defaultValue={state.completeDate}
            value={state.completeDate}
            onChange={handleChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            defaultValue={state.dueDate}
            value={state.dueDate}
            onChange={handleChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.margin}
          onClick={handleEdit}
        >
          Save Changes
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.margin}
          onClick={handleDelete}
        >
          Delete Activity
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="small"
          className={classes.margin}
          onClick={() => {
            props.setActivityView("ActivityFind");
          }}
        >
          Return to Activity Search
        </Button>
      </Grid>
    </Grid>
  );
}
