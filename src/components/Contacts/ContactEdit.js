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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function ContactEdit(props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const [state, setState] = React.useState({
    googleId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    role: ""
  });
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  React.useEffect(() => {
    async function fetchData() {
      // First get possible tags for user
      const attributesResponse = await fetch(
        endpoint +
          "attributes/all?pageSize=50&pageNum=0&sortField=title&sortDirection=ASC",
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

      // Now get contact info

      const contactResponse = await fetch(
        endpoint + "contacts/" + props.selectedContactId,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userContext.user.jwt
          }
        }
      );
      const contactData = await contactResponse.json();
      setState({
        googleId: contactData.googleId,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.emailAddress,
        phoneNumber: contactData.phoneNumber,
        organization: contactData.organization,
        role: contactData.role
      });

      // Only add tags to selected array if they are part of user's attributes
      // Check needed due to test dataset inconsistencies, may not be necessary later
      let initialSelectedAttributes = [];
      for (let attribute of contactData.attributes) {
        if (initialAttributes.includes(attribute.title)) {
          initialSelectedAttributes.push(attribute.title);
        }
      }
      setSelectedTags(initialSelectedAttributes);
    }
    fetchData();
  }, [props.selectedContactId, userContext.user.jwt, userContext.user.userId]);

  const updateContact = () => {
    async function updateRequest() {
      let attributeIdParams = "";
      selectedTags.forEach(tag => {
        attributeIdParams += "&attributeTitle=" + tag;
      });
      await fetch(
        endpoint +
          "contacts/update/" +
          props.selectedContactId +
          "?" +
          "googleId=" +
          state.googleId +
          "&" +
          "firstName=" +
          state.firstName +
          "&" +
          "lastName=" +
          state.lastName +
          "&" +
          "emailAddress=" +
          state.email +
          "&" +
          "phoneNumber=" +
          state.phoneNumber +
          "&" +
          "organization=" +
          state.organization +
          "&" +
          "role=" +
          state.role +
          attributeIdParams,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + userContext.user.jwt
          }
        }
      );
    }
    updateRequest().then(() => {
      props.setContactView("ContactFind");
      tableRef.current.onQueryChange();
    });
  };

  const deleteContact = () => {
    async function deleteRequest() {
      await fetch(endpoint + "contacts/delete/" + props.selectedContactId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userContext.user.jwt
        }
      });
    }
    deleteRequest().then(() => {
      props.setContactView("ContactFind");
      tableRef.current.onQueryChange();
    });
  };

  return (
    <form>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First Name"
              value={state.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastName"
              label="Last Name"
              value={state.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              value={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={state.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container item lg={6} md={6} sm={12} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="organization"
              label="Organization"
              value={state.organization}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="role"
              label="Role"
              value={state.role}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedTags}
              onChange={(event) => {setSelectedTags(event.target.value)}}
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
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
            onClick={() => {
              updateContact();
              props.setContactView("ContactFind");
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            size="large"
            className={classes.margin}
            onClick={() => {
              props.setContactView("ContactFind");
            }}
          >
            Return to Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.margin}
            onClick={() => {
              deleteContact();
              props.setContactView("ContactFind");
            }}
          >
            Delete Contact
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
