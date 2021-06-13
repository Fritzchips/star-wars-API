import "./App.css";
import React from "react";
import TableField from "./components/TableField";
import InputField from "./components/InputField";
import DataFetch from "./components/DataFetch";
import useController from "./components/useController";

export const libraryContext = React.createContext();

function App() {
  const [galacticLibrary, setGalacticLibrary] = useController();
  DataFetch(galacticLibrary, setGalacticLibrary);

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
