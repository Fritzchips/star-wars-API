import "./App.css";
import React, { useEffect } from "react";
import TableField from "./components/TableField";
import InputField from "./components/InputField";
import DataFetch from "./components/DataFetch";
import useController, { PAGE_CONTROL } from "./components/useController";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LoadingScreen from "./components/LoadingScreen";

export const libraryContext = React.createContext();

function App() {
  const [galacticList, dispatch] = useController();

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
    if (galacticList.localList.length > 1) {
      localStorage.setItem("library", JSON.stringify(galacticList));
    }
  }, [galacticList.localList]);

  const checkHandler = () => {
    console.log(galacticList);
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
          <p>Transcend through space and time,</p>
          <p>gain knowledge of beings that help write history."</p>
        </header>
        <br></br>
        <libraryContext.Provider
          value={{
            galacticList: galacticList,
            dispatch: dispatch,
          }}
        >
          <InputField />
          <button onClick={checkHandler}>Check Value</button>
          <button onClick={deleteHandler}>DeleteLocal</button>
          <br></br>
          {galacticList.localList.length > 1 ? (
            <TableField />
          ) : (
            <LoadingScreen />
          )}
        </libraryContext.Provider>
      </Container>
    </div>
  );
}

export default App;
