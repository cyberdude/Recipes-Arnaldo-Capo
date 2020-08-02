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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useFetch, { Provider } from "use-http";
import { Recipe } from "../../src/AppTypes";
import { Context } from "../../src/SearchProvider";
import { setRecipes, setSearchTerm } from "../../src/SearchReducer";

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
    <Paper className={classes.root} component="form" onSubmit={handleSubmit}>
      <InputBase
        placeholder="Search…"
        onChange={handleTermChange}
        value={inputTerm}
        inputProps={{ "aria-label": "search" }}
        className={classes.input}
      />
      <Button type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </Button>
    </Paper>
  );
};

export default Search;
