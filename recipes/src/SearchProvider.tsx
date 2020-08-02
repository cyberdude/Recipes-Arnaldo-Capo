import React, { useReducer, useEffect, Dispatch } from "react";
import { reducer, initialState, setRecipes } from "./SearchReducer";
import { Recipe } from "./AppTypes";
import useFetch from "use-http";
import useLocallyPersistedReducer from "../src/customReducer";

export const Context = React.createContext<
  Partial<{
    state: any;
    dispatch: Dispatch<any>;
    recipes: Recipe[];
  }>
>({});

const SearchProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { get, response, loading: recipeLoading, error } = useFetch<{
    results: Recipe[];
  }>("http://localhost:3000/api", {
    credentials: "same-origin",
  });

  const { term, page } = state;

  useEffect(() => {
    console.log("here", { term });

    getResults();
  }, [term, page]);

  const getResults = async () => {
    console.log(term);
    if (!term) {
      return;
    }

    const searchParams = new URLSearchParams({
      q: term,
      p: page,
    });

    await get(`/?${searchParams.toString()}`);

    if (response.ok) {
      dispatch(setRecipes(response.data.results));
    }
  };

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        recipes: state.recipes,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default SearchProvider;
