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

const tags = ["OSU", "GHC", "Capstone", "CS361", "Meetup"];

export default function ContactEdit(props) {
  const classes = useStyles();
  const [selectedTag, setSelectedTag] = React.useState([]);

  const handleChange = event => {
    setSelectedTag(event.target.value);
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
        <Grid item xs={12}>
          <TextField id="firstName" label="First Name" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="lastName" label="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="email" label="Email" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="phoneNumber" label="Phone Number" />
        </Grid>
      </Grid>
      <Grid container item lg={6} md={6} sm={12} spacing={2}>
        <Grid item xs={12}>
          <TextField id="organization" label="Organization" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="role" label="Role" />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
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
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.margin}
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
        >
          Delete Contact
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="small"
          className={classes.margin}
          onClick={() => {
            props.setContactView("ContactFind");
          }}
        >
          Return to Contact Search
        </Button>
      </Grid>
    </Grid>
  );
}
