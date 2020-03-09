import React, { forwardRef } from "react";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";

import { UserContext } from "../../userContext";

// const endpoint = "http://api.jot-app.com/";
const endpoint = "http://localhost:5000/";

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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};
export let tableRef = React.createRef();

export default function ActivityTable(props) {
  return (
    <UserContext.Consumer>
      {userContext => (
        <React.Fragment>
          <MaterialTable
            tableRef={tableRef}
            title="Activities"
            columns={[
              { title: "Activity ID", field: "activityId", hidden: true },
              { title: "Associated Contact", field: "contact.fullName" },
              { title: "Type", field: "type" },
              { title: "Description", field: "notes" },
              { title: "Status", field: "status" },
              { title: "Completed Date", field: "completeDate" },
              { title: "Due Date", field: "dueDate" }
            ]}
            icons={tableIcons}
            options={{
              pageSize: 5,
              initialPage: 0,
              sorting: false,
              search: false
            }}
            data={query =>
              new Promise((resolve, reject) => {
                query.orderBy = props.sortField;
                query.orderDirection = "asc";
                let url = endpoint + props.apiRoute;
                url += "userId=" + userContext.user.userId;
                url += "&sortField=" + query.orderBy;
                url += "&sortDirection=" + query.orderDirection;
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
                        if (element.dueDate != null) {
                          element.dueDate = element.dueDate.split("T")[0];
                        }
                        if (element.completeDate != null) {
                          element.completeDate = element.completeDate.split(
                            "T"
                          )[0];
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
                tooltip: "Edit or Delete Activity",
                onClick: (event, rowData) => {
                  props.setSelectedActivityId(rowData.activityId);
                  props.setActivityView("ActivityEdit");
                }
              }
            ]}
          />
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
}
