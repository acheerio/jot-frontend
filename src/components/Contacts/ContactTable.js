import React from "react";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import MaterialTable from "material-table";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import { forwardRef } from "react";

import { UserContext } from "../../userContext";

const endpoint = "http://api.jot-app.com/";
//const endpoint = "http://localhost:5000/";

const tableIcons = {
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />)
};
export let tableRef = React.createRef();

export default function ContactTable(props) {
  return (
    <UserContext.Consumer>
      {userContext => (
        <React.Fragment>
          <MaterialTable
            tableRef={tableRef}
            title="Contacts"
            columns={[
              { title: "Contact ID", field: "contactId", hidden: true },
              { title: "First Name", field: "firstName" },
              { title: "Last Name", field: "lastName" },
              { title: "Organization", field: "organization" },
              { title: "Role", field: "role" },
              { title: "Update Date", field: "updateDate" },
              { title: "Tags", field: "attributeDisplay" },
              { title: "Recent Updates", field: "recentActivity" }
            ]}
            icons={tableIcons}
            options={{
              pageSize: 5,
              initialPage: 0,
              search: false,
              exportButton: true,
              sorting: false
            }}
            data={query =>
              new Promise((resolve, reject) => {
                let url = endpoint + props.apiRoute;
                url += "sortField=" + props.sortField;
                url += "&sortDirection=ASC";
                url += "&pageSize=" + query.pageSize;
                url += "&pageNum=" + query.page;

                fetch(url, {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + userContext.user.jwt
                  }
                })
                  .then(response => response.json())
                  .then(result => {
                    let arr = result.content;
                    if (arr && arr.length > 0) {
                      arr.forEach(element => {
                        // Reformat dates
                        if (element.updateDate != null) {
                          element.updateDate = element.updateDate.split("T")[0];
                        }
                        // Get only most recent activity
                        if (
                          element.activities &&
                          element.activities.length > 0
                        ) {
                          element.recentActivity = element.activities.slice(
                            -1
                          )[0].notes;
                        } else {
                          element.recentActivity = null;
                        }
                        if (
                          element.attributes &&
                          element.attributes.length > 0
                        ) {
                          element.attributeList = [];
                          element.attributes.forEach(e => {
                            element.attributeList.push(e.title);
                          });
                          element.attributeDisplay = element.attributeList.join(
                            ", "
                          );
                        }
                      });
                    }
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
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
}
