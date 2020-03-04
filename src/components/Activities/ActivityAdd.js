import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { tableRef } from "../Tags/TagTable";

const endpoint = "http://api.jot-app.com/";
// const endpoint = "http://localhost:5000/";

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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const types = ["Task", "Note"];

export default function ActivityAdd(props) {
  const classes = useStyles();

  // Manage selected tags
  const [selectedType, setSelectedType] = React.useState([]);

  const handleTypeChange = event => {
    setSelectedType(event.target.value);
  };

  // Manage form to add new record
  const [state, setState] = React.useState({
    type: "",
    notes: "",
    status: "",
    completedDate: "",
    dueDate: ""
  });

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
      completedDate: "",
      dueDate: ""
    });
  }

  function handleAdd(e) {
    let url = endpoint + "activities/add?";
    url += "userId=7";
    url += "&type=" + state.title;
    url += "&notes=" + state.description;
    url += "&status=" + state.status;
    url += "&completedDate=" + state.description;
    url += "&dueDate=" + state.title;
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
          <TextField name="type" label="Type" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="notes" label="Notes" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="status" label="Status" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="completeDate" label="Complete Date" onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid container item lg={6} md={6} sm={12} spacing={2}>
        <Grid item xs={12}>
          <TextField name="dueDate" label="Due Date" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedType}
            onChange={handleTypeChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {types.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
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
