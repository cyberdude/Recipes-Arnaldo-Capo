import React from "react";
import RecipesList from "./components/RecipesList";

import { Grid, makeStyles, createStyles } from "@material-ui/core";
import Search from "./components/Search";
import SearchProvider from "../src/SearchProvider";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function Index() {
  const classes = useStyles();

  return (
    <SearchProvider>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={12}>
          <Search />
        </Grid>
        <Grid item xs={12}>
          <RecipesList />
        </Grid>
      </Grid>
    </SearchProvider>
  );
}
