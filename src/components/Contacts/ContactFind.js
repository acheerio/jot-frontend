import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ClearIcon from "@material-ui/icons/Clear";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../userContext";

const endpoint = "http://localhost:5000/";

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

let tagsHash = {};
const sorts = ["First Name", "Last Name", "Organization", "Role"];
const sortsHash = {
  "First Name": "firstName",
  "Last Name": "lastName",
  Organization: "organization",
  Role: "role",
  "Update Date": "updateDate"
};

export default function ContactFind(props) {
  const classes = useStyles();
  const value = useContext(UserContext);

  const [selectedTag, setSelectedTag] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = event => {
    setSelectedTag(event.target.value);
  };

  const handleSort = event => {
    props.changeSort(sortsHash[event.target.value]);
  };

  React.useEffect(() => {
    async function fetchData() {
      // Get possible tags for user
      const attributesResponse = await fetch(
        endpoint +
          "attributes/all?userId=" +
          value.user.userId +
          "&pageSize=20&pageNum=0&sortField=title&sortDirection=ASC",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + value.user.jwt
          }
        }
      );
      const attributesData = await attributesResponse.json();
      if (
        attributesData &&
        attributesData.content &&
        attributesData.content.length > 0
      ) {
        let attributeIds = attributesData.content.map(b => b.attributeId);
        let initialAttributes = attributesData.content.map(a => a.title);
        tagsHash = Object.fromEntries(
          initialAttributes.map((_, i) => [
            initialAttributes[i],
            attributeIds[i]
          ])
        );
        setTags(initialAttributes);
      }
    }
    fetchData();
  }, [value.user.jwt, value.user.userId]);

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
                  "contacts/searchByName?searchVal=" + searchValue + "&"
                );
              }}
            >
              Search
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<ClearIcon />}
              onClick={() => {
                props.refreshTable("contacts/searchByName?searchVal=&");
                document.getElementById("search-contacts").value = "";
              }}
            >
              Clear
            </Button>
          </form>
        </Grid>

        <Grid item lg={4} m={4} xs={12} style={{ textAlign: "center" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-multiple-chip-label">
              Filter By Tags
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedTag}
              onChange={handleChange}
              onClick={() => {
                if (tagsHash[selectedTag[0]] !== undefined) {
                  let list = [];
                  for (let i = 0; i < selectedTag.length; i++) {
                    list.push(tagsHash[selectedTag[i]]);
                  }
                  props.refreshTable(
                    "contacts/byAttributes?attributeId=" + list + "&"
                  );
                }
              }}
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-multiple-chip-label">Sort by</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={props.selectedSort}
              onChange={handleSort}
            >
              {sorts.map(sort => (
                <MenuItem key={sort} value={sort}>
                  {sort}
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
