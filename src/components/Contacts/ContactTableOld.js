import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Generate Order Data
function createData(
  contactId,
  name,
  org,
  role,
  updateDate,
  tags,
  recentUpdate
) {
  return { contactId, name, org, role, updateDate, tags, recentUpdate };
}

const rows = [
  createData(
    0,
    "Ailish Bateman",
    "OSU",
    "Capstone Team Member",
    "2/1/20",
    "Student, GHC, Capstone",
    "Some note example text here"
  ),
  createData(
    1,
    "Alice O'Herin",
    "OSU",
    "Capstone Team Member",
    "2/1/20",
    "Student, GHC, Capstone",
    "Some note example text here"
  ),
  createData(
    2,
    "Will Darnell",
    "OSU",
    "Capstone Team Member",
    "2/1/20",
    "Student, GHC, Capstone",
    "Some note example text here"
  )
];

export default function ContactTableOld() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Org</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Recent Updates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.contactId}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.org}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.updateDate}</TableCell>
              <TableCell>{row.tags}</TableCell>
              <TableCell>{row.recentUpdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
