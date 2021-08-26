import { useReducer } from "react";

export const PAGE_CONTROL = {
  SAVING: "saving",
  LOADING: "loading",
  NEXT_PAGE: "next page",
  PREVIOUS_PAGE: "previous page",
  SEARCHING: "search",
};

const initialState = {
  localList: [],
  userPreview: [],
  currentPage: 1,
  removalDate: "",
};

const reducer = (state, action) => {
  const { localList, currentPage } = state;
  switch (action.type) {
    case PAGE_CONTROL.SAVING:
      const twentyFourHours = 1000 * 60 * 60 * 24;
      const characterList = [...action.value];

      return {
        ...state,
        localList: characterList,
        userPreview: characterList.slice(0, 10),
        removalDate: Date.now() + twentyFourHours,
      };

    case PAGE_CONTROL.LOADING:
      return (state = { ...action.value });

    case PAGE_CONTROL.NEXT_PAGE:
      if (currentPage !== 9) {
        const turnPage = currentPage + action.value;
        return {
          ...state,
          currentPage: turnPage,
          userPreview: localList.slice(turnPage * 10 - 10, turnPage * 10),
        };
      } else {
        return state;
      }

    case PAGE_CONTROL.PREVIOUS_PAGE:
      if (currentPage !== 1) {
        const turnPage = currentPage - action.value;
        return {
          ...state,
          currentPage: turnPage,
          userPreview: localList.slice(turnPage * 10 - 10, turnPage * 10),
        };
      } else {
        return state;
      }

    case PAGE_CONTROL.SEARCHING:
      const filteredList = localList.filter((hero) => {
        return hero.name.toLowerCase().includes(action.value.toLowerCase());
      });
      return {
        ...state,
        userPreview: action.value
          ? filteredList.splice(0, 10)
          : localList.slice(currentPage * 10 - 10, currentPage * 10),
      };

    default:
      return state;
  }
};

function useController() {
  const [characterList, dispatch] = useReducer(reducer, initialState);

  return [characterList, dispatch];
}

export default useController;
