import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { tableRef } from "../Activities/ActivityTable";
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function ActivityAdd(props) {
  const classes = useStyles();

  function getCurrentDate() {
    let today = new Date().toISOString().slice(0, 10);
    return today;
  }

  // Manage form to add new record
  const [state, setState] = React.useState({
    type: "Task",
    notes: "",
    status: "Not Applicable",
    completeDate: getCurrentDate(),
    dueDate: getCurrentDate(),
    contactId: "",
    contacts: []
  });

  //const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      console.log("Getting contact ids and names");
      const contactsResponse = await fetch(
        endpoint + "contacts/IdAndNames?userId=3" // TODO: GET USERID FROM CONTEXT
      );
      const contactsData = await contactsResponse.json();
      await setState({...state, contacts: [...state.contacts, ...contactsData] });
    }
    fetchData();
  }, []);

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

  function handleAdd(e) {
    let url = endpoint + "activities/add?";
    url += "userId=7";
    // url += "&contactId=11"; /* TODO: do not hardcode, get real ID */
    url += "&type=" + state.type;
    url += "&notes=" + state.notes;
    url += "&status=" + state.status;
    url += "&completeDate=" + state.completeDate;
    url += "&dueDate=" + state.dueDate;
    url += "&contactId=" + state.contactId;
    console.log(url);
    fetch(url, { method: "post" })
      .then(response => {
        tableRef.current && tableRef.current.onQueryChange();
        props.setActivityView("ActivityFind");
      })
      .then(response => {
        console.log("success!");
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
            onChange={(event, value) => setState({...state, contactId: value.contactId})}
            renderInput={params => <TextField {...params} label="Associated Contact" variant="outlined" />}
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
