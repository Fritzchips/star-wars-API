import React, { useContext } from "react";
import { libraryContext } from "../App";
import { PAGE_CONTROL } from "../data-management/useController";

function PageSearch() {
  const library = useContext(libraryContext);
  return (
    <div className="d-flex flex-wrap search-nav">
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
          className="search-input"
        ></input>
      </span>
      <span>
        <br></br>
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
