import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

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
export default function ActivityFind(props) {
  const classes = useStyles();
  const [selectedType, setSelectedType] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = event => {
    if (event.target.value == "" && selectedType != "") {
      props.refreshTable("activities/all?");
    }
    if (event.target.value != "") {
      props.refreshTable("activities/byType?type=" + event.target.value + "&");
    }
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
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

        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter By Type</InputLabel>
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

        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
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
