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
    <div className="App">
      <Container>
        <header className="text-center">
          <h1 className="header-modify">Galactic Oracle</h1>
          <p>"Using the most ancient power of the force.</p>
          <p>Transcend through space and time,</p>
          <p>gain knowledge of beings that help write history."</p>
        </header>
        <br></br>
        <libraryContext.Provider
          value={{
            characterList: characterList,
            dispatch: dispatch,
          }}
        >
          <PageSearch />
          <br></br>
          {characterList.localList.length > 1 ? (
            <CharacterTable />
          ) : (
            <LoadingScreen />
          )}
        </libraryContext.Provider>
      </Container>
    </div>
  );
}

export default App;
