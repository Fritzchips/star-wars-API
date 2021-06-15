import React, { useContext } from "react";
import { libraryContext } from "../App";

function CharacterRow() {
  const library = useContext(libraryContext);
  if (library.characterList.userPreview.length > 1) {
    return (
      <>
        {library.characterList.userPreview.map((character) => (
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
  } else {
    return (
      <>
        <tr>
          <td colSpan="6">That character may exist in another universe</td>
        </tr>
      </>
    );
  }
}

export default CharacterRow;
