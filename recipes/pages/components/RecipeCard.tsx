import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Recipe } from "../../src/AppTypes";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 140,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    width: 400,
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

type Props = { recipe: Recipe };

const RecipeCard = ({ recipe }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const thumbnail = recipe.thumbnail ? recipe.thumbnail : "/default_food.jpg";

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={thumbnail}
        title={recipe.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {recipe.title}
          </Typography>
          <Typography
            noWrap={true}
            variant="subtitle1"
            color="textSecondary"
            className={classes.ingredients}
          >
            {recipe.ingredients}
          </Typography>
          <Link href={recipe.href}>Visit site</Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default RecipeCard;
