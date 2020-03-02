import React from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import { forwardRef } from "react";
import {UserContext} from "../../userContext";

const endpoint = "http://api.jot-app.com/";
// const endpoint = "http://localhost:5000/";

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

export default function TagTable() {
    return (
      <UserContext.Consumer>
          {(value)=>(
            <React.Fragment>
                <MaterialTable
                  tableRef={tableRef}
                  title="Tags"
                  columns={[
                      { title: "Contact ID", field: "contactId", hidden: true },
                      { title: "Title", field: "title" },
                      { title: "Description", field: "description" },
                      { title: "Update Date", field: "createDate" },
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
                        query.orderBy = "title";
                        query.orderDirection = "asc";
                        let url = endpoint + "attributes/all?";
                        url += "userId=7";
                        url += "&sortField=" + query.orderBy;
                        url += "&sortDirection=" + query.orderDirection;
                        url += "&pageSize=" + query.pageSize;
                        url += "&pageNum=" + query.page;
                        console.log(url);
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
                />
            </React.Fragment>)}
      </UserContext.Consumer>
    );
}
