import { Recipe } from "./AppTypes";

const SET_RECIPES = "search/SET_RECIPES";
const SEARCH_LOADING_INDICATOR = "search/SEARCH_LOADING_INDICATOR";
const SET_SEARCH_QUERY = "search/SET_SEARCH_QUERY";
const SET_PAGE_NUMBER = "search/SET_PAGE_NUMBER";
const SET_INGREDIENTS = "search/SET_INGREDIENTS";
const PERSIST_KEY = "recipe_store";

// interface LoadUsersAction {
//   type: typeof LOAD_USERS;
//   users: User[];
// }

// interface UserLoadingIndicatorAction {
//   type: typeof USER_LOADING_INDICATOR;
//   loading: boolean;
// }

// interface AddMessagesAction {
//   type: typeof ADD_MESSAGES;
//   messages: string[];
// }

// export type RecipesAction =
//   | LoadUsersAction
//   | UserLoadingIndicatorAction
//   | AddMessagesAction;

type State = {
  recipes: Recipe[];
  term: string;
  page: number;
  ingredients: any[];
};

export const initialState: State = {
  recipes: [],
  term: "",
  page: 1,
  ingredients: [],
};

export const reducer = (state: State, action: any) => {
  console.log({ action });

  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.recipes],
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
        ingredients: [...state.ingredients, ...action.ingredients],
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

export const setIngredients = (ingredients: []) => ({
  type: SET_INGREDIENTS,
  ingredients,
});
