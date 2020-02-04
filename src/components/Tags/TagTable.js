import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Generate Order Data
function createData(
    attributeId,
    name,
    createDate,
    description
) {
    return { name, createDate, description };
}

const rows = [
    createData(
        1,
        "OSU",
        "2/1/2020",
        "Classmate at OSU eCampus program",
    ),
    createData(
        2,
        "GHC",
        "10/1/2019",
        "Met through Grace Hopper Celebration",
    ),
    createData(
        3,
        "LinkedIn",
        "1/1/2020",
        "LinkedIn connection",
    ),
    createData(
        4,
        "Facebook Summer 2019 Interns",
        "4/15/2019",
        "Facebook summer internship 2019 cohort",
    ),
    createData(
        5,
        "Code for Good",
        "12/1/2019",
        "JP Morgan Code for Good event",
    )
];

export default function TagTable() {
    return (
        <React.Fragment>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.attributeId}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.createDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
