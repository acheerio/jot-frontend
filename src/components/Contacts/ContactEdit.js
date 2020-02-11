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

export default function ContactEdit(props) {
  const classes = useStyles();
  const [selectedTag, setSelectedTag] = React.useState([]);

  const handleChange = event => {
    setSelectedTag(event.target.value);
  };

  const [googleId, setGoogleId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");
  const [tags, setTags] = React.useState([
    "OSU",
    "GHC",
    "Capstone",
    "CS361",
    "Meetup"
  ]);

  React.useEffect(() => {
    async function fetchData() {
      console.log(props.selectedContactId);
      const response = await fetch(
        "http://localhost:5000/contacts/" + props.selectedContactId
      );
      const data = await response.json();
      setGoogleId(data.googleId);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.emailAddress);
      setPhoneNumber(data.phoneNumber);
      setOrganization(data.organization);
      setRole(data.role);
    }
    fetchData();
  }, [props.selectedContactId]);

  // Function to update record:
  const updateContact = () => {
    async function updateRequest() {
      let response = await fetch(
        "http://localhost:5000/contacts/update/" +
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
          role,
        {
          method: "PUT"
        }
      );
      let data = await response.json();
      return data;
    }
    updateRequest().then(() => {
      props.setContactView("ContactFind");
    });
  };

  // Function to update record:
  const deleteContact = () => {
    async function deleteRequest() {
      let response = await fetch(
        "http://localhost:5000/contacts/delete/" + props.selectedContactId,
        {
          method: "PUT"
        }
      );
    }
    deleteRequest().then(() => {
      props.setContactView("ContactFind");
    });
  };

  // Function to delete record:

  return (
    <Grid container spacing={3} className={classes.root}>
      <form>
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
            onClick={() => {
              updateContact();
              console.log("Updated contact ");
              props.setContactView("ContactFind");
            }}
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
            onClick={() => {
              deleteContact();
              console.log("Deleted contact ");
              props.setContactView("ContactFind");
            }}
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
      </form>
    </Grid>
  );
}
