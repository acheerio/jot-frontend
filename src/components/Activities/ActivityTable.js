import React, {useContext} from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import {UserContext} from "../../userContext";

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
      {(value)=>(
        <React.Fragment>
          <MaterialTable
            tableRef={tableRef}
            title="Activities"
            columns={[
              { title: "Activity ID", field: "activityId", hidden: true },
              { title: "Associated Contact", field: "contact.fullName" },
              { title: "Type", field: "type" },
              { title: "Notes", field: "notes" },
              { title: "Status", field: "status" },
              { title: "Completed Date", field: "completeDate" },
              { title: "Due Date", field: "dueDate" },
            ]}
            icons={tableIcons}
            options={{
              pageSize: 5,
              initialPage: 0,
              defaultSort: "desc",
              search: false
            }}
            data={query =>
              new Promise((resolve, reject) => {
                query.orderBy = "notes";
                query.orderDirection = "asc";
                let url = endpoint + "activities/all?"; //props.apiRoute;
                url += "userId=7";
                url += "&sortField=" + query.orderBy;
                url += "&sortDirection=" + query.orderDirection;
                url += "&pageSize=" + query.pageSize;
                url += "&pageNum=" + query.page;
                console.log(query);
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    let arr = result.content;
                    console.log(result.content)
                    let tableData = JSON.stringify(arr);
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
                  props.setContactView("ActivityEdit");
                }
              }
            ]}
          />
        </React.Fragment>)}
    </UserContext.Consumer>
  );
}
