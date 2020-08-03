import React, { useReducer, useContext } from "react";
import {
  List,
  ListItem,
  createStyles,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { setPageNumber } from "../../src/SearchReducer";
import { Context } from "../../src/SearchProvider";
import { Recipe } from "../../src/AppTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "./RecipeCard";

const useStyles = makeStyles(() =>
  createStyles({
    recipeListItem: {
      alignSelf: "center",
      display: "list-item",
      maxWidth: 800,
      margin: "auto",
    },
    loader: {
      display: "block",
      margin: "30px auto",
    },
    noSearch: {
      marginTop: 20,
    },
  })
);

const RecipesList = () => {
  const { state, dispatch, recipes = [], recipeLoading } = useContext(Context);
  const classes = useStyles();

  const { page, term } = state;

  if (!term) {
    return (
      <Typography component="h3" align="center" className={classes.noSearch}>
        Please search for delicious foodies.
      </Typography>
    );
  }

  const hasMore = Boolean(recipes.length * page >= recipes.length);

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={() => {
        dispatch(setPageNumber(page + 1));
      }}
      hasMore={hasMore}
      loader={
        recipeLoading ? <CircularProgress className={classes.loader} /> : null
      }
      endMessage={
        <Typography component="h4" align="center">
          All loaded.
        </Typography>
      }
    >
      <List>
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
