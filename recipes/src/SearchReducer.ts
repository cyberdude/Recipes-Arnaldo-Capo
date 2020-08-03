import { Recipe, Ingredient } from "./AppTypes";

const SET_RECIPES = "search/SET_RECIPES";
const SEARCH_LOADING_INDICATOR = "search/SEARCH_LOADING_INDICATOR";
const SET_SEARCH_QUERY = "search/SET_SEARCH_QUERY";
const SET_PAGE_NUMBER = "search/SET_PAGE_NUMBER";
const SET_INGREDIENTS = "search/SET_INGREDIENTS";

type State = {
  recipes: Recipe[];
  term: string;
  page: number;
  ingredients: Ingredient[];
};

export const initialState: State = {
  recipes: [],
  term: "",
  page: 1,
  ingredients: [],
};

export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes:
          state.page > 1
            ? [...state.recipes, ...action.recipes]
            : action.recipes,
      };

    case SEARCH_LOADING_INDICATOR:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        term: action.term,
      };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.page,
      };

    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      };

    default:
      throw new Error("Invalid Search action.");
  }
};

export const setRecipes = (recipes: Recipe[]) => ({
  type: SET_RECIPES,
  recipes,
});

export const setSearchTerm = (term: string) => ({
  type: SET_SEARCH_QUERY,
  term,
});

export const setPageNumber = (page: number) => ({
  type: SET_PAGE_NUMBER,
  page,
});

export const setIngredients = (ingredients: Ingredient[]) => ({
  type: SET_INGREDIENTS,
  ingredients,
});
