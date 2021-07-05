import axios from "axios";
import { PAGE_CONTROL } from "./useController";

async function DataFetch(dispatch) {
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
  } catch (error) {
    console.error(error);
  }
}

async function requestCharacterInfo(starWarsList, dispatch) {
  try {
    const promise = Promise.all(
      starWarsList.map(async (character) => {
        character.species = await getSpecies(character.species);
        character.homeworld = await getHomeWorld(character.homeworld);
        return character;
      })
    );

    const characters = await promise;

    dispatch({
      type: PAGE_CONTROL.SAVING,
      value: characters,
    });
  } catch (error) {
    console.error(error);
  }
}

async function getSpecies(speciesURL) {
  if (speciesURL.length === 0) {
    return "Human";
  } else {
    try {
      const requestCharacterSpecies = await axios.get(speciesURL[0]);
      if (!requestCharacterSpecies.data.name) {
        throw "Error was found in finding character species";
      }
      return requestCharacterSpecies.data.name;
    } catch (error) {
      console.error(error);
    }
  }
}
async function getHomeWorld(homeWorldURL) {
  try {
    const requestCharacterHome = await axios.get(homeWorldURL);
    if (!requestCharacterHome.data.name) {
      throw "Error was found in finding character homeworld";
    }
    return requestCharacterHome.data.name;
  } catch (error) {
    console.error(error);
  }
}

export default DataFetch;
