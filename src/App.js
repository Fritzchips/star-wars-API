import "./App.css";
import React, { useEffect } from "react";
import PageSearch from "./components/PageSearch";
import DataFetch from "./data-management/DataFetch";
import useController, { PAGE_CONTROL } from "./data-management/useController";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LoadingScreen from "./components/LoadingScreen";
import CharacterTable from "./components/CharacterTable";

export const libraryContext = React.createContext();

function App() {
  const [characterList, dispatch] = useController();

  useEffect(() => {
    const sessionTime = Date.now();
    if (localStorage.getItem("library")) {
      const accessArchive = JSON.parse(localStorage.getItem("library"));

      dispatch({
        type: PAGE_CONTROL.LOADING,
        value: accessArchive,
      });

      if (sessionTime >= accessArchive.removalDate) {
        localStorage.clear();
        DataFetch(dispatch);
      }
    } else {
      DataFetch(dispatch);
    }
  }, []);

  useEffect(() => {
    if (characterList.localList.length > 1) {
      localStorage.setItem("library", JSON.stringify(characterList));
    }
  }, [characterList.localList]);

  return (
    <Container className="App" fluid>
      <div className="d-flex flex-column star-wars-body">
        <div className="text-center">
          <h1 className="header-title">Galactic Oracle</h1>
          <div className="header-text">
            "Using the most ancient power of the force.
          </div>
          <div className="header-text">Transcend through space and time,</div>
          <div className="header-text">
            gain knowledge of beings that help write history."
          </div>
        </div>
        <libraryContext.Provider
          value={{
            characterList: characterList,
            dispatch: dispatch,
          }}
        >
          <br></br>
          <PageSearch />
          {characterList.localList.length >= 1 ? (
            <CharacterTable />
          ) : (
            <LoadingScreen />
          )}
        </libraryContext.Provider>
      </div>
    </Container>
  );
}

export default App;
