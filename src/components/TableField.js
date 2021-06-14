import React, { useContext } from "react";
import "../App.css";
import TableDisplay from "./TableDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { libraryContext } from "../App";
import EmptyTable from "./EmptyTable";

function TableField() {
  const library = useContext(libraryContext);

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
        <tbody>
          {library.galacticList.userPreview.length > 1 ? (
            <TableDisplay />
          ) : (
            <EmptyTable />
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableField;
