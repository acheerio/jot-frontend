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
import { ExportReactCSV } from "./ContactTable";

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
// function loadTags(){
//   query => 
//   new Promise((resolve, reject) => {
//     let url = 'http:'
//   })
// }
let tagsHash = {}
const sorts = ["First Name", "Last Name", "Organization", "Role"]
const sortsHash = {"First Name": "firstName", "Last Name": "lastName", "Organization": "organization",
 "Role": "role", "Update Date": "updateDate"}

export default function ContactFind(props) {
  const classes = useStyles();
  // const tags = loadTags();
  const [selectedTag, setSelectedTag] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');


  const handleChange = event => {
    setSelectedTag(event.target.value);
    console.log(selectedTag)
  };

  const handleSort = event => {
    props.changeSort(sortsHash[event.target.value]);
  }

  React.useEffect(() => {
    async function fetchData() {
      // Get possible tags for user
      /* TODO: Get userId from somewhere (context?) and use instead of hardcoded id here */
      const attributesResponse = await fetch(
        endpoint +
          "attributes/all?userId=7" +
          "&pageSize=20&pageNum=0&sortField=title&sortDirection=ASC"
      );
      const attributesData = await attributesResponse.json();
      console.log(attributesData);
      let attributeIds = attributesData.content.map(b => b.attributeId);
      console.log(attributeIds);
      let initialAttributes = attributesData.content.map(a => a.title);
      tagsHash = Object.fromEntries(initialAttributes.map((_, i) => [initialAttributes[i], attributeIds[i]]));

      setTags(initialAttributes);
    }
    fetchData();
  }, []);

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
              onChange={(e) => {setSearchValue(e.target.value)}}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SearchIcon />}
              onClick={() => {
                props.refreshTable("contacts/searchByName?searchVal=" + searchValue + "&");
              }}
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
              onClick={() => {
                if (tagsHash[selectedTag[0]] === undefined){
                  return
                }
                else {
                  let list = []
                  for (let i = 0; i < selectedTag.length; i++){
                    list.push(tagsHash[selectedTag[i]])
                  }
                  props.refreshTable("contacts/byAttributes?attributeId=" + list + "&");

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
            <InputLabel id="demo-mutiple-chip-label">Sort by</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
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
