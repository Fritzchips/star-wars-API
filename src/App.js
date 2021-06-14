import "./App.css";
import React, { useEffect } from "react";
import TableField from "./components/TableField";
import InputField from "./components/InputField";
import DataFetch from "./components/DataFetch";
import useController, { PAGE_CONTROL } from "./components/useController";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

export const libraryContext = React.createContext();

function App() {
  const [galacticLibrary, dispatch] = useController();

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
    if (galacticLibrary.localList.length > 1) {
      localStorage.setItem("library", JSON.stringify(galacticLibrary));
    }
  }, [galacticLibrary.localList]);

  const checkHandler = () => {
    console.log(galacticLibrary);
  };
  const deleteHandler = () => {
    localStorage.clear();
    console.log("local storage cleared");
  };

  return (
    <div className="App">
      <Container>
        <header className="text-center">
          <h1 className="header-modify">Galactic Oracle</h1>
          <p>"Using the most ancient power of the force.</p>
          <p>Transcend through space and time,</p>{" "}
          <p>gain knowledge of beings that help write history."</p>
        </header>
        <br></br>
        <libraryContext.Provider
          value={{
            galacticLibrary: galacticLibrary,
            dispatch: dispatch,
          }}
        >
          <InputField />
          <button onClick={checkHandler}>Check Value</button>
          <button onClick={deleteHandler}>DeleteLocal</button>
          <br></br>
          <TableField />
        </libraryContext.Provider>
      </Container>
    </div>
  );
}

export default App;
