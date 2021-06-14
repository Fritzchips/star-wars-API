import React from "react";
import "../App.css";
import TableDisplay from "./TableDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

function TableField() {
  return (
    <div>
      <Table variant="dark" className="text-center" bordered hover>
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody striped>
          <TableDisplay />
        </tbody>
      </Table>
    </div>
  );
}

export default TableField;
