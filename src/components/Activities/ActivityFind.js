import React from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

export default function ActivityFind(props) {
  const classes = useStyles();
  const [selectedType, setSelectedType] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = event => {
    if (event.target.value === "" && selectedType !== "") {
      props.refreshTable("activities/all?");
    }
    if (event.target.value !== "") {
      props.refreshTable("activities/byType?type=" + event.target.value + "&");
    }
    setSelectedType(event.target.value);
  };

  const handleSort = event => {
    props.changeSort(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={3} m={3} xs={12} style={{ textAlign: "center" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="search-activities"
              label="Search Activities"
              variant="outlined"
              size="small"
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SearchIcon />}
              onClick={() => {
                props.refreshTable(
                  "activities/searchByNotes?searchVal=" + searchValue + "&"
                );
              }}
            >
              Search
            </Button>
          </form>
        </Grid>

        <Grid item lg={3} m={3} xs={12} style={{ textAlign: "center" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Filter By Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedType}
              onChange={handleChange}
            >
              <MenuItem value={""}>No Filter</MenuItem>
              <MenuItem value={"Note"}>Note</MenuItem>
              <MenuItem value={"Task"}>Task</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={3} m={3} xs={12} style={{ textAlign: "center" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.sortField}
              onChange={handleSort}
            >
              <MenuItem value={"contact.firstName"}>Contact Name</MenuItem>
              <MenuItem value={"type"}>Type</MenuItem>
              <MenuItem value={"notes"}>Description</MenuItem>
              <MenuItem value={"status"}>Status</MenuItem>
              <MenuItem value={"completeDate"}>Completed Date</MenuItem>
              <MenuItem value={"dueDate"}>Due Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={3} m={3} xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={() => {
              props.setActivityView("ActivityAdd");
            }}
          >
            Add New Activity
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
