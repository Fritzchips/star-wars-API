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
            library.updateState({
              type: PAGE_CONTROL.SEARCH,
              value: e.target.value,
            })
          }
        ></input>
      </form>
      <div>
        <button
          onClick={() =>
            library.updateState({ type: PAGE_CONTROL.PREVIOUS, value: 1 })
          }
        >
          Prev
        </button>
        <span>Page # {library.baseState.currentPage}</span>
        <button
          onClick={() =>
            library.updateState({ type: PAGE_CONTROL.NEXT, value: 1 })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default InputField;
