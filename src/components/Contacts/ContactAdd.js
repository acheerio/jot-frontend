import React, { useContext } from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { tableRef } from "./ContactTable";
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

export default function ContactAdd(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);
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
    if (event.target.name === "tags") {
      setSelectedTags(event.target.value);
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      // Get possible tags for user
      const attributesResponse = await fetch(
        endpoint +
          "attributes/all?pageSize=100&pageNum=0&sortField=title&sortDirection=ASC",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userContext.user.jwt
          }
        }
      );
      const attributesData = await attributesResponse.json();
      let initialAttributes = attributesData.content.map(a => a.title);
      setTags(initialAttributes);
    }
    fetchData();
  }, [userContext.user.userId, userContext.user.jwt]);

  function handleCancel(e) {
    props.setContactView("ContactFind");
  }

  function handleAdd(e) {
    let attributeIdParams = "";
    selectedTags.forEach(tag => {
      attributeIdParams += "&attributeTitle=" + tag;
    });
    let url = endpoint + "contacts/add?";
    url += "googleId=";
    url += "&firstName=" + state.firstName;
    url += "&lastName=" + state.lastName;
    url += "&emailAddress=" + state.email;
    url += "&phoneNumber=" + state.phone;
    url += "&organization=" + state.org;
    url += "&role=" + state.role;
    url += attributeIdParams;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userContext.user.jwt
      }
    }).then(() => {
      tableRef.current && tableRef.current.onQueryChange();
    });
    props.setContactView("ContactFind");
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            name="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phoneNumber"
            label="Phone Number"
            name="phone"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container item lg={6} md={6} sm={12} spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="organization"
            label="Organization"
            name="org"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="role"
            label="Role"
            name="role"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
          <Select
            name="tags"
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedTags}
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
