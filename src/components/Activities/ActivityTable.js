import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Generate Order Data
function createData(
  userId,
  type,
  notes,
  status,
  completeDate,
  dueDate
) {
  return { type, notes, status, completeDate, dueDate };
}

const rows = [
  createData(
    0,
    "Task",
    "Add 50 new connections",
    "In progress",
    "N/a",
    "2/15/2020",
  ),
  createData(
    1,
    "Task",
    "Call John Back",
    "Done",
    "N/a",
    "2/15/2020",
  )
];

export default function ActivityTable() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Complete Date</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.userId}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.notes}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.completeDate}</TableCell>
              <TableCell>{row.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
