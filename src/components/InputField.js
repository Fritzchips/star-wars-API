import React, { useContext } from "react";
import { libraryContext } from "../App";
import { PAGE_CONTROL } from "./useController";

function InputField() {
  const library = useContext(libraryContext);
  return (
    <div>
      <form>
        <label>Looking for someone?</label>
        <input
          type="text"
          onChange={(e) =>
            library.dispatch({
              type: PAGE_CONTROL.SEARCHING,
              value: e.target.value,
            })
          }
        ></input>
      </form>
      <div>
        <button
          onClick={() =>
            library.dispatch({ type: PAGE_CONTROL.PREVIOUS_PAGE, value: 1 })
          }
        >
          Prev
        </button>
        <span>Page # {library.galacticLibrary.currentPage}</span>
        <button
          onClick={() =>
            library.dispatch({ type: PAGE_CONTROL.NEXT_PAGE, value: 1 })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default InputField;
