import { Article, Category, Premise } from "./definitions";

export type CategoriesResponse = {
  category: Category[];
}

export type PremisesResponse = {
  premises: Premise[];
}