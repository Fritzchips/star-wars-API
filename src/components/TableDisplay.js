import React, { useContext } from "react";
import { libraryContext } from "../App";

function TableDisplay() {
  const library = useContext(libraryContext);
  return (
    <>
      {library.galacticList.userPreview.map((character) => (
        <React.Fragment key={character.name}>
          <tr>
            <td>{character.name}</td>
            <td>{character.birth_year}</td>
            <td>{character.height}</td>
            <td>{character.mass}</td>
            <td>{character.homeworld}</td>
            <td>{character.species}</td>
          </tr>
        </React.Fragment>
      ))}
    </>
  );
}

export default TableDisplay;
