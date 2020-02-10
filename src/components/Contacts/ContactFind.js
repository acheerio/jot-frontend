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

const tags = ["OSU", "GHC", "Capstone", "CS361", "Meetup"];

export default function ContactFind(props) {
  const classes = useStyles();
  const [selectedTag, setSelectedTag] = React.useState([]);

  const handleChange = event => {
    setSelectedTag(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="search-contacts"
              label="Search Contacts"
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </form>
        </Grid>

        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Filter By Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedTag}
              onChange={handleChange}
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
              {tags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
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
              props.setContactView("ContactAdd");
            }}
          >
            Add New Contact
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
