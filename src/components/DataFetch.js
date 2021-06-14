import axios from "axios";
import { PAGE_CONTROL } from "./useController";

function DataFetch(dispatch) {
  async function requestStarWarsLibrary(dispatch) {
    let pageNumber = 1;
    let characterList = [];
    try {
      while (pageNumber < 10) {
        const requestStarWarsPage = await axios.get(
          `https://swapi.dev/api/people/?page=${pageNumber}`
        );
        const decipherPage = await requestStarWarsPage.data.results;
        characterList = [...characterList, ...decipherPage];
        pageNumber++;
      }
      requestCharacterInfo(characterList, dispatch);
    } catch {
      console.log("error");
    }
  }
  requestStarWarsLibrary(dispatch);
}

async function requestCharacterInfo(characterList, dispatch) {
  try {
    characterList.map(async (character) => {
      const requestCharacterSpecies = await axios.get(character.species);
      const speciesName = await requestCharacterSpecies.data.name;
      const requestCharacterHome = await axios.get(character.homeworld);
      const homeName = await requestCharacterHome.data.name;
      const updatedCharacterList = [
        ...characterList,
        (character.species = speciesName ? speciesName : "Human"),
        (character.homeworld = homeName),
      ];
      updatedCharacterList.splice(updatedCharacterList.length - 2);
      dispatch({
        type: PAGE_CONTROL.SAVING,
        value: updatedCharacterList,
      });
    });
  } catch {
    console.log("error");
  }
}
export default DataFetch;
