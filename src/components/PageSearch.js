import React, { useContext } from "react";
import { libraryContext } from "../App";
import { PAGE_CONTROL } from "../data-management/useController";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function PageSearch() {
  const library = useContext(libraryContext);
  return (
    <div>
      <span>
        <label>Looking for someone?</label>
        <br></br>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            library.dispatch({
              type: PAGE_CONTROL.SEARCHING,
              value: e.target.value,
            })
          }
        ></input>
      </span>
      <span>
        <button
          className="btn-modify"
          onClick={() =>
            library.dispatch({ type: PAGE_CONTROL.PREVIOUS_PAGE, value: 1 })
          }
        >
          Prev
        </button>
        <span>Page # {library.characterList.currentPage}</span>
        <button
          className="btn-modify"
          onClick={() =>
            library.dispatch({ type: PAGE_CONTROL.NEXT_PAGE, value: 1 })
          }
        >
          Next
        </button>
      </span>
    </div>
  );
}

export default PageSearch;
