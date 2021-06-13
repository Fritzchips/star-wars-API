import React from "react";
import TableDisplay from "./TableDisplay";

function TableField() {
  return (
    <div>
      <table>
        <thead>
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
          <TableDisplay />
        </tbody>
      </table>
    </div>
  );
}

export default TableField;
