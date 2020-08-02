import React, { useReducer, useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  createStyles,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { reducer, initialState, setPageNumber } from "../../src/SearchReducer";
import { Context } from "../../src/SearchProvider";
import { Recipe } from "../../src/AppTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "./RecipeCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    recipeListItem: {
      alignSelf: "center",
      display: "list-item",
      maxWidth: 800,
      margin: "auto",
    },
  })
);

const RecipesList = () => {
  const { state, dispatch, recipes = [] } = useContext(Context);
  const classes = useStyles();

  const { page } = state;

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={() => {
        dispatch(setPageNumber(page + 1));
      }}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>All loaded.</b>
        </p>
      }
    >
      <List className={classes.root}>
        {recipes.map((recipe: Recipe, index: number) => (
          <ListItem key={index} className={classes.recipeListItem}>
            <RecipeCard recipe={recipe} />
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default RecipesList;
