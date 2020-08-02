import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Recipe Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
