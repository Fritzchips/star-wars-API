import axios from "axios";
import { PAGE_CONTROL } from "./useController";

function DataFetch(dispatch) {
  async function requestStarWarsLibrary(dispatch) {
    let pageNumber = 1;
    let starWarsList = [];
    try {
      while (pageNumber < 10) {
        const requestStarWarsPage = await axios.get(
          `https://swapi.dev/api/people/?page=${pageNumber}`
        );
        const decipherPage = await requestStarWarsPage.data.results;
        starWarsList = [...starWarsList, ...decipherPage];
        pageNumber++;
      }
      requestCharacterInfo(starWarsList, dispatch);
    } catch {
      console.log("error");
    }
  }
  requestStarWarsLibrary(dispatch);
}

async function requestCharacterInfo(starWarsList, dispatch) {
  try {
    starWarsList.map(async (character) => {
      const requestCharacterSpecies = await axios.get(character.species);
      const speciesName = await requestCharacterSpecies.data.name;
      const requestCharacterHome = await axios.get(character.homeworld);
      const homeName = await requestCharacterHome.data.name;
      const updatedStarWarsList = [
        ...starWarsList,
        (character.species = speciesName ? speciesName : "Human"),
        (character.homeworld = homeName),
      ];
      updatedStarWarsList.splice(updatedStarWarsList.length - 2);
      dispatch({
        type: PAGE_CONTROL.SAVING,
        value: updatedStarWarsList,
      });
    });
  } catch {
    console.log("error");
  }
}
export default DataFetch;
