import React, { useReducer, useEffect, Dispatch } from "react";
import { reducer, initialState, setRecipes } from "./SearchReducer";
import { Recipe, Ingredient } from "./AppTypes";
import useFetch from "use-http";
import { useStorageReducer } from "react-storage-hooks";

export const Context = React.createContext<
  Partial<{
    state: any;
    dispatch: Dispatch<any>;
    recipes: Recipe[];
    recipeLoading: boolean;
  }>
>({});

const SearchProvider = (props) => {
  const [state, dispatch] = useStorageReducer(
    globalThis.localStorage,
    "search-reducer",
    reducer,
    initialState
  );

  const { get, response, loading: recipeLoading, error } = useFetch<{
    results: Recipe[];
  }>("http://localhost:3000/api", {
    credentials: "same-origin",
  });

  const { term, page, ingredients } = state;

  useEffect(() => {
    getResults();
  }, [term, page, ingredients]);

  const getResults = async () => {
    if (!term) {
      return;
    }

    const searchParamsValues: { q: string; p: string; i?: string } = {
      q: term,
      p: page,
    };

    if (ingredients.length) {
      searchParamsValues.i = ingredients
        .map((val: Ingredient) => val.label)
        .join(",");
    }

    const searchParams = new URLSearchParams(searchParamsValues);

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
        recipeLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default SearchProvider;
