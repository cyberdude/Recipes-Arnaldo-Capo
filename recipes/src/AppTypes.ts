export type Recipe = {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
};

type AutoCompleteIngredientNewOptions = {
  inputValue?: string;
};

export type Ingredient = {
  name?: string;
  label?: string;
} & AutoCompleteIngredientNewOptions;
