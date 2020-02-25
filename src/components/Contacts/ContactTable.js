import React, {useContext} from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {UserContext} from "../../userContext";

// const endpoint = "http://api.jot-app.com/";
const endpoint = "http://localhost:5000/";

const tableIcons = {
  /*
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />), */
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
/*    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />) */
};
export let tableRef = React.createRef();

export default function ContactTable(props) {
  return (
      <UserContext.Consumer>
          {(value)=>(
        <React.Fragment>
          <MaterialTable tableRef={tableRef}
            columns={[
              { title: "Contact ID", field: "contactId", hidden: true },
              { title: "Name", field: "firstName" },
              { title: "Organization", field: "organization" },
              { title: "Role", field: "role" },
              { title: "Update Date", field: "updateDate" },
              { title: "Tags", field: "attributeDisplay"},
              { title: "Recent Updates", field: "recentActivity" }
            ]}
            icons={tableIcons}
            options={{
              pageSize: 5,
              initialPage: 0,
              defaultSort: "desc"
            }}
            data={query =>
              new Promise((resolve, reject) => {
                query.orderBy = "contactId";
                query.orderDirection = "asc";
                // let url = 'http://localhost:8080/contacts/all?userId=1&pageNum=0&pageSize=20&sortField=contactId&sortDirection=DESC';
                let url = endpoint + "contacts/all?";
                // let url = 'http://api.jot-app.com/contacts?'
                url += "userId=" + value.user.userId;
                url += "&sortField=" + query.orderBy;
                url += "&sortDirection=" + query.orderDirection;
                url += "&pageSize=" + query.pageSize;
                url += "&pageNum=" + query.page;
                console.log(query);
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    let arr = result.content;
                    arr.forEach((element) => {
                        if (element.activities.length > 0) {
                            element.recentActivity = element.activities.slice(-1)[0].notes;
                        }
                        else {
                            element.recentActivity = null;
                        }
                        if (element.attributes.length > 0) {
                          element.attributeList = [];
                          element.attributes.forEach(e => {element.attributeList.push(e.title)});
                          element.attributeDisplay = element.attributeList.join(", ");
                        }
                    });
                    //console.log("convert back to json");
                    let tableData = JSON.stringify(arr);
                    //console.log("conversion completed, json =");
                    //console.log(tableData);
                    resolve({
                      data: arr,
                      page: result.number,
                      totalCount: result.totalElements
                    });
                  });
              })
            }
            actions={[
              {
                icon: Edit,
                tooltip: "Save User",
                onClick: (event, rowData) => {
                  props.setSelectedContactId(rowData.contactId);
                  props.setContactView("ContactEdit");
                }
              }
            ]}
          />
        </React.Fragment>)}
      </UserContext.Consumer>
  );
}
