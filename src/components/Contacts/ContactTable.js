import React from "react";
import MaterialTable from 'material-table';

export default function ContactTable() {
    return (
        <React.Fragment>
            <MaterialTable
                columns={[
                    {title: 'Name', field: 'firstName'},
                    {title: 'Organization', field: 'organization'},
                    {title: 'Role', field: 'role'},
                    {title: 'Update Date', field: 'updateDate'},
                    {title: 'Tags', field: null},
                    {title: 'Recent Updates', field: null},
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                        // let url = 'http://localhost:8080/contacts/all?userId=1&pageNum=0&pageSize=20&sortField=contactId&sortDirection=DESC';
                        let url = 'http://localhost:8080/contacts/all?'
                        // let url = 'http://api.jot-app.com/contacts?'
                        url += 'userId=1';
                        url += '&sortField=contactId';
                        url += '&sortDirection=DESC';
                        url += '&pageSize=' + query.pageSize;
                        url += '&pageNum=' + (query.page + 1);
                        console.log(query);
                        fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                console.log(result.content)
                                resolve({
                                    data: result.content,
                                    page: result.page - 1,
                                    totalCount: result.totalElements,
                                })
                            })
                    })
                }
            />
        </React.Fragment>
    );
}