import React, {useContext} from "react";
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
import {UserContext} from "../../userContext";

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
  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleChange = event => {
    setSelectedTags(event.target.value);
  };

  const [googleId, setGoogleId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const value = useContext(UserContext);

  React.useEffect(() => {
    async function fetchData() {
      // First get possible tags for user
      /* TODO: Get userId from somewhere (context?) and use instead of hardcoded id here */
      const attributesResponse = await fetch(
        endpoint +
          "attributes/all?userId=7" +
          "&pageSize=20&pageNum=0&sortField=title&sortDirection=ASC",
          {
            method: 'GET',
            headers: {
              'Authorization': "Bearer " + value.user.jwt,
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
            method: 'GET',
            headers: {
              'Authorization': "Bearer " + value.user.jwt,
            }
          }
      );
      const contactData = await contactResponse.json();
      setGoogleId(contactData.googleId);
      setFirstName(contactData.firstName);
      setLastName(contactData.lastName);
      setEmail(contactData.emailAddress);
      setPhoneNumber(contactData.phoneNumber);
      setOrganization(contactData.organization);
      setRole(contactData.role);
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
  }, [props.selectedContactId]);

  // Function to update record:
  const updateContact = () => {
    async function updateRequest() {
      let attributeIdParams = "";
      selectedTags.forEach(tag => {
        attributeIdParams += "&attributeTitle=" + tag;
      });
      console.log(attributeIdParams);
      let response = await fetch(
        endpoint +
          "contacts/update/" +
          props.selectedContactId +
          "?" +
          "googleId=" +
          googleId +
          "&" +
          "firstName=" +
          firstName +
          "&" +
          "lastName=" +
          lastName +
          "&" +
          "emailAddress=" +
          email +
          "&" +
          "phoneNumber=" +
          phoneNumber +
          "&" +
          "organization=" +
          organization +
          "&" +
          "role=" +
          role +
          attributeIdParams,
        {
          method: "PUT",
          headers: {
            'Authorization': "Bearer " + value.user.jwt,
          }
        }
      );
      let data = await response.json();
      return data;
    }
    updateRequest().then(() => {
      props.setContactView("ContactFind");
      tableRef.current.onQueryChange();
    });
  };

  // Function to update record:
  const deleteContact = () => {
    async function deleteRequest() {
      let response = await fetch(
        endpoint + "contacts/delete/" + props.selectedContactId,
        {
          method: "PUT",
          headers: {
            'Authorization': "Bearer " + value.user.jwt,
          }
        }
      );
    }
    deleteRequest().then(() => {
      props.setContactView("ContactFind");
      tableRef.current.onQueryChange();
    });
  };

  // Function to delete record:

  return (
    <form>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item lg={6} md={6} sm={12} justify="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container item lg={6} md={6} sm={12} spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="organization"
              label="Organization"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="role"
              label="Role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-mutiple-chip-label">Add Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedTags}
              onChange={handleChange}
              onClose={() => {console.log("Selected tags: "); console.log(selectedTags); console.log("All tags: "); console.log(tags);}}
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
              console.log("Updated contact ");
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
                console.log("Deleted contact ");
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
