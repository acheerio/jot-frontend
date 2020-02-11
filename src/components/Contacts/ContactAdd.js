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
import { tableRef } from "./ContactTable";

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

export default function ContactAdd(props) {
  const classes = useStyles();
  const [selectedTag, setSelectedTag] = React.useState([]);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    org: "",
    phone: "",
    tags: []
  });

  const handleChange = event => {
    if (event.target.name === 'tags') {
      console.log("it was a tag!")
      setSelectedTag(event.target.value);
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    }
  };

  React.useEffect(() => console.log(state), [state]);

  function handleCancel(e) {
    props.setContactView("ContactFind");
  }
  function handleAdd(e) {
    console.log(state);
    console.log(JSON.stringify(state))
    let url = 'http://localhost:5000/contacts/add?';
    url += 'userId=1';
    url += '&googleId=fakeGoogleId';
    url += '&firstName=' + state.firstName;
    url += '&lastName=' + state.lastName;
    url += '&emailAddress=' + state.email;
    url += '&phoneNumber=' + state.phone;
    url += '&organization=' + state.org;
    url += '&role=' + state.role;
  console.log(url)
    fetch(url, {method: 'post'})
        .then((response) => {
          tableRef.current && tableRef.current.onQueryChange()
        })
        .then((response) => {
          console.log("success!")
        });
    props.setContactView("ContactFind");
    /* TODO: HANDLE ATTRIBUTES */
  }

  return (
        <Grid container spacing={3} className={classes.root}>
              <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
                <Grid item xs={12}>
                  <TextField id="firstName" label="First Name" name="firstName" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="lastName" label="Last Name" name="lastName" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" label="Email" name="email" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="phoneNumber" label="Phone Number" name="phone" onChange={handleChange}/>
                </Grid>
              </Grid>
              <Grid container item lg={6} md={6} sm={12} spacing={2}>
                <Grid item xs={12}>
                  <TextField id="organization" label="Organization" name="org" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="role" label="Role" name="role" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
                  <Select
                      name="tags"
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
              <Grid item xs={12}>
                <Button
                    type="button"
                    name="add"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.margin}
                    onClick={handleAdd}
                >
                  Add Contact
                </Button>
                <Button
                    type="button"
                    name="cancel"
                    variant="contained"
                    size="large"
                    className={classes.margin}
                    onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
        </Grid>
  );
}
