import axios from "axios";
import { PAGE_CONTROL } from "./useController";

function DataFetch(setGalacticLibrary) {
  async function requestStarWarsLibrary(setGalacticLibrary) {
    let pageNumber = 1;
    let characterList = [];
    try {
      while (pageNumber < 10) {
        const requestStarWarsPage = await axios.get(
          `https://swapi.dev/api/people/?page=${pageNumber}`
        );
        const decipherPage = await requestStarWarsPage.data.results;
        characterList = [...characterList, ...decipherPage];
        console.log(characterList);
        pageNumber++;
      }
      requestCharacterInfo(characterList, setGalacticLibrary);
    } catch {
      console.log("error");
    }
  }
  requestStarWarsLibrary(setGalacticLibrary);
}

async function requestCharacterInfo(characterList, setGalacticLibrary) {
  try {
    characterList.map(async (item) => {
      const characterSpecies = await axios.get(item.species);
      const speciesName = await characterSpecies.data.name;
      const characterHome = await axios.get(item.homeworld);
      const homeName = await characterHome.data.name;
      const updatedCharacterList = [
        ...characterList,
        (item.species = speciesName ? speciesName : "Human"),
        (item.homeworld = homeName),
      ];
      updatedCharacterList.splice(updatedCharacterList.length - 2);
      setGalacticLibrary({
        type: PAGE_CONTROL.SAVING,
        value: updatedCharacterList,
      });
    });
  } catch {
    console.log("error");
  }
}
export default DataFetch;
