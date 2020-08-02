import React, { useState, useReducer, useContext } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
  InputBase,
  Paper,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import useFetch, { Provider } from "use-http";
import { Recipe } from "../../src/AppTypes";
import { Context } from "../../src/SearchProvider";
import {
  setRecipes,
  setSearchTerm,
  setIngredients,
} from "../../src/SearchReducer";
import IngredientsData from "../../public/ingredients.json";

const filter = createFilterOptions();

let { tags: ingredients = [] } = IngredientsData;

ingredients = ingredients.splice(0, 100).map((ingredient) => ingredient.name);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: 20,
    position: "relative",
    scale: 1.1,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    // padding: 10,
    position: "absolute",
    right: 0,
    width: 20,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 0,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);

  const [inputTerm, setInputTerm] = useState("");
  const [value, setValue] = useState([]);

  React.useEffect(() => {
    console.log({ value });
    dispatch(setIngredients(value));
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log({ inputTerm });
    dispatch(setSearchTerm(inputTerm));
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputTerm((event.target as HTMLInputElement).value);
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
        multiple
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={ingredients}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(option) => option.name}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Free solo with text demo"
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default Search;
