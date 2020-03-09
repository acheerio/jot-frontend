import React, { useContext } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
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
    type: "Task",
    notes: "",
    status: "Not Applicable",
    completeDate: null,
    dueDate: null,
    contactId: "",
    contacts: []
  });

  React.useEffect(() => {
    async function fetchData() {
      const contactsResponse = await fetch(
        endpoint + "contacts/IdAndNames?userId=" + userContext.user.userId,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userContext.user.jwt
          }
        }
      );
      const contactsData = await contactsResponse.json();
      await setState({
        ...state,
        contacts: [...state.contacts, ...contactsData]
      });
    }
    fetchData();
  }, [userContext.user.userId, userContext.user.jwt]);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  function clear() {
    setState({
      type: "",
      notes: "",
      status: "",
      completeDate: "",
      dueDate: "",
      contactId: "",
      contacts: []
    });
  }

  function handleAdd() {
    let url = endpoint + "activities/add?";
    url += "userId=" + userContext.user.userId;
    url += "&type=" + state.type;
    url += "&notes=" + state.notes;
    url += "&status=" + state.status;
    if (state.completeDate != null && state.dueDate !== "null") {
      url += "&completeDate=" + state.completeDate;
    }
    if (state.dueDate != null && state.dueDate !== "null") {
      url += "&dueDate=" + state.dueDate;
    }
    url += "&contactId=" + state.contactId;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userContext.user.jwt
      }
    }).then(() => {
      tableRef.current && tableRef.current.onQueryChange();
      props.setActivityView("ActivityFind");
    });
    clear();
  }

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
          <Autocomplete
            id="combo-box-demo"
            options={state.contacts}
            getOptionLabel={contact => contact.fullName}
            style={{ width: 300 }}
            onChange={(event, value) =>
              setState({ ...state, contactId: value.contactId })
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Associated Contact"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField name="notes" label="Description" onChange={handleChange} />
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
          onClick={handleAdd}
        >
          Add Activity
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
