import React, { useState, useReducer, useContext } from "react";
import {
  makeStyles,
  InputBase,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import SearchIcon from "@material-ui/icons/Search";
import { Ingredient } from "../../src/AppTypes";
import { Context } from "../../src/SearchProvider";
import {
  setSearchTerm,
  setIngredients,
  setPageNumber,
} from "../../src/SearchReducer";
import IngredientsData from "../../public/ingredients.json";
import { useStorageState } from "react-storage-hooks";

const filter = createFilterOptions();

// Adding this autocomplete "db" for demo purpose only
// This should be an API aync call
let { tags: ingredients = [] } = (IngredientsData as {
  tags: Ingredient[];
}) || { tags: [] as Ingredient[] };

ingredients = ingredients.splice(0, 100).map((ingredient: Ingredient) => {
  ingredient.label = ingredient.name;
  return ingredient;
}) as Ingredient[];
//  end

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "20px auto",
    position: "relative",
    scale: 1.1,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    width: 20,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 0,
  },
  ingredients: {
    margin: `0 auto ${theme.spacing(2)}px`,
    backgroundColor: "white",
  },
}));

const Search = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);

  const [inputTerm, setInputTerm] = useStorageState(
    globalThis.localStorage,
    "set-input-term",
    ""
  );
  const [value, setValue] = useStorageState<Ingredient[]>(
    globalThis.localStorage,
    "ingredients",
    [
      {
        name: "",
        label: "",
        inputValue: "",
      },
    ]
  );

  React.useEffect(() => {
    dispatch(setIngredients(value));
    dispatch(setPageNumber(1));
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(setSearchTerm(inputTerm));
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newValue = (event.target as HTMLInputElement).value;
    setInputTerm((prevState) => {
      if (prevState !== newValue) {
        dispatch(setPageNumber(1));
      }

      return newValue;
    });
  };

  return (
    <>
      <Paper className={classes.root} component="form" onSubmit={handleSubmit}>
        <InputBase
          placeholder="Search…"
          onChange={handleTermChange}
          value={inputTerm}
          inputProps={{ "aria-label": "search" }}
          className={classes.input}
        />
        <Button
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </Button>
      </Paper>

      <Autocomplete
        value={value}
        size="small"
        className={classes.ingredients}
        onChange={(_, newValue) => {
          if (typeof newValue === "string") {
            setValue([
              {
                label: newValue,
              },
            ]);
          } else {
            setValue(newValue as Ingredient[]);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              label: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={ingredients}
        getOptionLabel={(option) => option.label}
        renderOption={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Filter by ingredients"
              variant="outlined"
            />
          );
        }}
        freeSolo
        multiple
        clearOnBlur
        selectOnFocus
        handleHomeEndKeys
      />
    </>
  );
};

export default Search;
