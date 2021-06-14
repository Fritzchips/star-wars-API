import { useReducer } from "react";

export const PAGE_CONTROL = {
  SAVING: "saving",
  LOADING: "loading",
  NEXT: "next",
  PREVIOUS: "previous",
  SEARCH: "search",
};

const initialState = {
  localCopy: [],
  userPreview: [],
  currentPage: 1,
  removalDate: "",
};

const reducer = (state, action) => {
  const { localCopy, currentPage } = state;
  switch (action.type) {
    case PAGE_CONTROL.SAVING:
      const twoMins = 1000 * 30;
      return {
        ...state,
        localCopy: [...action.value],
        userPreview: localCopy.slice(0, 10),
        removalDate: Date.now() + twoMins,
      };

    case PAGE_CONTROL.LOADING:
      return (state = { ...action.value });

    case PAGE_CONTROL.NEXT:
      if (currentPage !== 9) {
        const displayPage = currentPage + action.value;
        return {
          ...state,

          currentPage: displayPage,
          userPreview: localCopy.slice(displayPage * 10 - 10, displayPage * 10),
        };
      } else {
        return state;
      }

    case PAGE_CONTROL.PREVIOUS:
      if (currentPage !== 1) {
        const displayPage = currentPage - action.value;
        return {
          ...state,

          currentPage: displayPage,
          userPreview: localCopy.slice(displayPage * 10 - 10, displayPage * 10),
        };
      } else {
        return state;
      }

    case PAGE_CONTROL.SEARCH:
      const fake = localCopy.filter((hero) => {
        return hero.name.toLowerCase().includes(action.value.toLowerCase());
      });
      return {
        ...state,
        userPreview: action.value
          ? fake.splice(0, 10)
          : localCopy.slice(currentPage * 10 - 10, currentPage * 10),
      };

    default:
      return state;
  }
};

function useController() {
  const [galacticLibrary, setGalacticLibrary] = useReducer(
    reducer,
    initialState
  );

  return [galacticLibrary, setGalacticLibrary];
}

export default useController;
