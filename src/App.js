import "./App.css";
import React, { useEffect } from "react";
import TableField from "./components/TableField";
import InputField from "./components/InputField";
import DataFetch from "./components/DataFetch";
import useController, { PAGE_CONTROL } from "./components/useController";

export const libraryContext = React.createContext();

function App() {
  const [galacticLibrary, setGalacticLibrary] = useController();

  useEffect(() => {
    const sessionTime = Date.now();
    if (localStorage.getItem("library")) {
      const valueLoaded = JSON.parse(localStorage.getItem("library"));

      setGalacticLibrary({
        type: PAGE_CONTROL.LOADING,
        value: valueLoaded,
      });
      console.log("data loaded");
      console.log("session", sessionTime);
      console.log("removalDate", valueLoaded.removalDate);
      if (sessionTime >= valueLoaded.removalDate) {
        localStorage.clear();
        console.log("data cleared, getting fresh data");
        DataFetch(setGalacticLibrary);
      }
    } else {
      DataFetch(setGalacticLibrary);
    }
    return galacticLibrary;
  }, []);

  useEffect(() => {
    if (galacticLibrary.localCopy.length > 1) {
      localStorage.setItem("library", JSON.stringify(galacticLibrary));
      console.log("saved:", localStorage);
    }
  }, [galacticLibrary]);

  useEffect(() => {}, []);

  const checkHandler = () => {
    console.log(galacticLibrary);
  };

  return (
    <div className="App">
      <header>
        <h1>Galactic Oracle</h1>
        <p>
          "Using the most ancient power of the force. Transcend through space
          and time, gain knowledge of beings that help write the history."
        </p>
      </header>
      <br></br>
      <libraryContext.Provider
        value={{
          baseState: galacticLibrary,
          updateState: setGalacticLibrary,
        }}
      >
        <InputField />
        <button onClick={checkHandler}>Check Value</button>
        <br></br>
        <TableField />
      </libraryContext.Provider>
    </div>
  );
}

export default App;
