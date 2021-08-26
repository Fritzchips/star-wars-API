import React from "react";
import Table from "react-bootstrap/Table";
import CharacterRow from "./CharacterRow";

function CharacterTable() {
  return (
    <div>
      <Table
        variant="dark"
        className="text-center"
        bordered
        hover
        responsive="sm"
      >
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
          <CharacterRow />
        </tbody>
      </Table>
    </div>
  );
}

export default CharacterTable;
