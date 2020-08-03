import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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
          <Typography noWrap={true} variant="subtitle1" color="textSecondary">
            {recipe.ingredients}
          </Typography>
          <Link href={recipe.href} target="_blank" rel="noopener">
            Visit site
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default RecipeCard;
